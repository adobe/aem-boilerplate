import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
import { addProductsToCart } from '@dropins/storefront-cart/api.js';
import WishlistToggle from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { Button, provider as UI } from '@dropins/tools/components.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { performCatalogServiceQuery } from '../../scripts/commerce.js';

// initialize dropins
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/wishlist.js';
import { rootLink } from '../../scripts/scripts.js';

const isMobile = window.matchMedia('only screen and (max-width: 900px)').matches;

const recommendationsQuery = `query GetRecommendations(
  $pageType: PageType!
  $category: String
  $currentSku: String
  $cartSkus: [String]
  $userPurchaseHistory: [PurchaseHistory]
  $userViewHistory: [ViewHistory]
) {
  recommendations(
    cartSkus: $cartSkus
    category: $category
    currentSku: $currentSku
    pageType: $pageType
    userPurchaseHistory: $userPurchaseHistory
    userViewHistory: $userViewHistory
  ) {
    results {
      displayOrder
      pageType
      productsView {
        name
        sku
        images {
          url
        }
        urlKey
        externalId
        __typename
      }
      storefrontLabel
      totalProducts
      typeId
      unitId
      unitName
    }
    totalResults
  }
}`;

let unitsPromise;

function renderPlaceholder(block) {
  block.innerHTML = `<h2></h2>
  <div class="scrollable">
    <div class="product-grid">
      ${[...Array(5)].map(() => `
        <div class="placeholder">
          <picture><img width="300" height="375" src="" /></picture>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderItem(unitId, product) {
  let image = product.images[0]?.url;
  if (image) {
    image = image.replace('http://', '//');
  }

  const clickHandler = () => {
    window.adobeDataLayer.push((dl) => {
      dl.push({ event: 'recs-item-click', eventInfo: { ...dl.getState(), unitId, productId: parseInt(product.externalId, 10) || 0 } });
    });
  };

  const addToCartHandler = async () => {
    // Always emit the add-to-cart event, regardless of product type.
    window.adobeDataLayer.push((dl) => {
      dl.push({ event: 'recs-item-add-to-cart', eventInfo: { ...dl.getState(), unitId, productId: parseInt(product.externalId, 10) || 0 } });
    });
    if (product.__typename === 'SimpleProductView') {
      // Only add simple products directly to cart (no options selections needed)
      try {
        await addProductsToCart([{
          sku: product.sku,
          quantity: 1,
        }]);
      } catch (error) {
        console.error('Error adding products to cart', error);
      }
    } else {
      // Navigate to page for non-simple products
      window.location.href = rootLink(`/products/${product.urlKey}/${product.sku}`);
    }
  };

  const ctaText = product.__typename === 'SimpleProductView' ? 'Add to Cart' : 'Select Options';
  const item = document.createRange().createContextualFragment(`<div class="product-grid-item">
    <a href="${rootLink(`/products/${product.urlKey}/${product.sku}`)}">
      <picture>
        <source type="image/webp" srcset="${image}?width=300&format=webply&optimize=medium" />
        <img loading="lazy" alt="Image of ${product.name}" width="300" height="375" src="${image}?width=300&format=jpg&optimize=medium" />
      </picture>
      <span>${product.name}</span>
    </a>
    <div class="product-grid-actions">
      <span class="product-grid-cta"></span>
      <span class="product-grid-wishlist"></span>
    </div>
  </div>`);
  item.querySelector('a').addEventListener('click', clickHandler);
  const buttonEl = item.querySelector('.product-grid-cta');
  const buttonWishlist = item.querySelector('.product-grid-wishlist');
  UI.render(Button, {
    children: ctaText,
    onClick: addToCartHandler,
  })(buttonEl);
  wishlistRender.render(WishlistToggle, {
    product,
  })(buttonWishlist);
  return item;
}

function renderItems(block, results) {
  // Render only first recommendation
  const [recommendation] = results;
  if (!recommendation) {
    // Hide block content if no recommendations are available
    block.textContent = '';
    return;
  }

  window.adobeDataLayer.push((dl) => {
    dl.push({ event: 'recs-unit-impression-render', eventInfo: { ...dl.getState(), unitId: recommendation.unitId } });
  });

  // Title
  block.querySelector('h2').textContent = recommendation.storefrontLabel;

  // Grid
  const grid = block.querySelector('.product-grid');
  grid.innerHTML = '';
  const { productsView } = recommendation;
  productsView.forEach((product) => {
    grid.appendChild(renderItem(recommendation.unitId, product));
  });

  const inViewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        window.adobeDataLayer.push((dl) => {
          dl.push({ event: 'recs-unit-view', eventInfo: { ...dl.getState(), unitId: recommendation.unitId } });
        });
      }
    });
  }, { threshold: 0.5 });
  inViewObserver.observe(block);
}

const mapProduct = (product, index) => ({
  rank: index,
  score: 0,
  sku: product.sku,
  name: product.name,
  productId: parseInt(product.externalId, 10) || 0,
  type: product.__typename,
  visibility: undefined,
  categories: [],
  weight: 0,
  image: product.images.length > 0 ? product.images[0].url : undefined,
  url: new URL(rootLink(`/products/${product.urlKey}/${product.sku}`), window.location.origin).toString(),
  queryType: 'primary',
});

const mapUnit = (unit) => ({
  unitId: unit.unitId,
  unitName: unit.unitName,
  unitType: 'primary',
  searchTime: 0,
  totalProducts: unit.totalProducts,
  primaryProducts: unit.totalProducts,
  backupProducts: 0,
  products: unit.productsView.map(mapProduct),
  pagePlacement: '',
  typeId: unit.typeId,

});

async function loadRecommendation(block, context, visibility, filters) {
  // Only load once the recommendation becomes visible
  if (!visibility) {
    return;
  }

  // Only proceed if all required data is available
  if (!context.pageType
    || (context.pageType === 'Product' && !context.currentSku)
    || (context.pageType === 'Category' && !context.category)
    || (context.pageType === 'Cart' && !context.cartSkus)) {
    return;
  }

  const storeViewCode = getConfigValue('headers.cs.Magento-Store-View-Code');

  if (unitsPromise) {
    return;
  }

  unitsPromise = new Promise((resolve, reject) => {
    // Get product view history
    try {
      const viewHistory = window.localStorage.getItem(`${storeViewCode}:productViewHistory`) || '[]';
      context.userViewHistory = JSON.parse(viewHistory);
    } catch (e) {
      window.localStorage.removeItem('productViewHistory');
      console.error('Error parsing product view history', e);
    }

    // Get purchase history
    try {
      const purchaseHistory = window.localStorage.getItem(`${storeViewCode}:purchaseHistory`) || '[]';
      context.userPurchaseHistory = JSON.parse(purchaseHistory);
    } catch (e) {
      window.localStorage.removeItem('purchaseHistory');
      console.error('Error parsing purchase history', e);
    }

    window.adobeDataLayer.push((dl) => {
      dl.push({ event: 'recs-api-request-sent', eventInfo: { ...dl.getState() } });
    });

    performCatalogServiceQuery(recommendationsQuery, context).then(({ recommendations }) => {
      window.adobeDataLayer.push((dl) => {
        dl.push({ recommendationsContext: { units: recommendations.results.map(mapUnit) } });
        dl.push({ event: 'recs-api-response-received', eventInfo: { ...dl.getState() } });
      });
      resolve(recommendations);
    }).catch((error) => {
      console.error('Error fetching recommendations', error);
      reject(error);
    });
  });

  let { results } = await unitsPromise;
  results = results.filter((unit) => (filters.typeId ? unit.typeId === filters.typeId : true));

  renderItems(block, results);
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const filters = {};
  if (config.typeid) {
    filters.typeId = config.typeid;
  }
  renderPlaceholder(block);

  const context = {};
  let visibility = !isMobile;

  function handleProductChanges({ productContext }) {
    context.currentSku = productContext?.sku;
    loadRecommendation(block, context, visibility, filters);
  }

  function handleCategoryChanges({ categoryContext }) {
    context.category = categoryContext?.name;
    loadRecommendation(block, context, visibility, filters);
  }

  function handlePageTypeChanges({ pageContext }) {
    context.pageType = pageContext?.pageType;
    loadRecommendation(block, context, visibility, filters);
  }

  function handleCartChanges({ shoppingCartContext }) {
    context.cartSkus = shoppingCartContext?.totalQuantity === 0
      ? []
      : shoppingCartContext?.items?.map(({ product }) => product.sku);
    loadRecommendation(block, context, visibility, filters);
  }

  window.adobeDataLayer.push((dl) => {
    dl.addEventListener('adobeDataLayer:change', handlePageTypeChanges, { path: 'pageContext' });
    dl.addEventListener('adobeDataLayer:change', handleProductChanges, { path: 'productContext' });
    dl.addEventListener('adobeDataLayer:change', handleCategoryChanges, { path: 'categoryContext' });
    dl.addEventListener('adobeDataLayer:change', handleCartChanges, { path: 'shoppingCartContext' });
  });

  if (isMobile) {
    const section = block.closest('.section');
    const inViewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibility = true;
          loadRecommendation(block, context, visibility, filters);
          inViewObserver.disconnect();
        }
      });
    });
    inViewObserver.observe(section);
  }
}
