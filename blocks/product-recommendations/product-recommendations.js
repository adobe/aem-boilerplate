/* eslint-disable no-underscore-dangle */
import { addProductsToCart } from '@dropins/storefront-cart/api.js';
import { Button, provider as UI } from '@dropins/tools/components.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { performCatalogServiceQuery } from '../../scripts/commerce.js';
import { getConfigValue } from '../../scripts/configs.js';

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
        url
        images {
          url
        }
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
  const urlKey = product.url.split('/').pop().replace('.html', '');
  let image = product.images[0]?.url;
  image = image.replace('http://', '//');

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
      window.location.href = `/products/${urlKey}/${product.sku}`;
    }
  };

  const ctaText = product.__typename === 'SimpleProductView' ? 'Add to Cart' : 'Select Options';
  const item = document.createRange().createContextualFragment(`<div class="product-grid-item">
    <a href="/products/${urlKey}/${product.sku}">
      <picture>
        <source type="image/webp" srcset="${image}?width=300&format=webply&optimize=medium" />
        <img loading="lazy" alt="${product.name}" width="300" height="375" src="${image}?width=300&format=jpg&optimize=medium" />
      </picture>
      <span>${product.name}</span>
    </a>
    <span class="product-grid-cta"></span>
  </div>`);
  item.querySelector('a').addEventListener('click', clickHandler);
  const buttonEl = item.querySelector('.product-grid-cta');
  UI.render(Button, {
    children: ctaText,
    onClick: addToCartHandler,
  })(buttonEl);
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

const mapUnit = (unit) => ({
  ...unit,
  unitType: 'primary',
  searchTime: 0,
  primaryProducts: unit.totalProducts,
  backupProducts: 0,
  products: unit.productsView.map((product, index) => ({
    ...product,
    rank: index,
    score: 0,
    productId: parseInt(product.externalId, 10) || 0,
    type: product.__typename,
    queryType: 'primary',
  })),
  pagePlacement: '',
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

  const storeViewCode = await getConfigValue('commerce-store-view-code');

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
    context.cartSkus = shoppingCartContext?.items?.map(({ product }) => product.sku);
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
