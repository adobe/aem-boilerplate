import ProductList from '@dropins/storefront-product-discovery/containers/ProductList.js';
import Facets from '@dropins/storefront-product-discovery/containers/Facets.js';
import ResultsInfo from '@dropins/storefront-product-discovery/containers/ResultsInfo.js';
import { render as provider } from '@dropins/storefront-product-discovery/render.js';
import { Button, Icon, provider as UI } from '@dropins/tools/components.js';
// Wishlist Dropin
import { WishlistToggle } from '@dropins/storefront-wishlist/containers/WishlistToggle.js';
import { render as wishlistRender } from '@dropins/storefront-wishlist/render.js';
// Cart Dropin
import * as cartApi from '@dropins/storefront-cart/api.js';
import { rootLink } from '../../scripts/scripts.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { fetchPlaceholders } from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/search.js';
import '../../scripts/initializers/wishlist.js';

export default async function decorate(block) {
  const labels = await fetchPlaceholders();

  const config = readBlockConfig(block);

  const fragment = document.createRange().createContextualFragment(`
    <div class="search__input"></div>
    <div class="search__wrapper">
      <div class="search__left-column">
        <div class="search__result-info"></div>
        <div class="search__facets"></div>
      </div>
      <div class="search__right-column">
        <div class="search__product-list"></div>
      </div>
    </div>
  `);

  const $resultInfo = fragment.querySelector('.search__result-info');
  const $facets = fragment.querySelector('.search__facets');
  const $productList = fragment.querySelector('.search__product-list');

  block.innerHTML = '';
  block.appendChild(fragment);

  const categoryPathConfig = config.urlpath ? { categoryPath: config.urlpath } : {};

  const getAddToCartButton = (product) => {
    if (product.typename === 'ComplexProductView') {
      const button = document.createElement('div');
      UI.render(Button, {
        children: labels.Global?.AddProductToCart,
        icon: Icon({ source: 'Cart' }),
        onClick: () => {
          window.location.href = rootLink(`/products/${product.urlKey}/${product.sku}`);
        },
        variant: 'primary',
      })(button);
      return button;
    }
    const button = document.createElement('div');
    UI.render(Button, {
      children: labels.Global?.AddProductToCart,
      icon: Icon({ source: 'Cart' }),
      onClick: () => cartApi.addProductsToCart([{ sku: product.sku, quantity: 1 }]),
      variant: 'primary',
    })(button);
    return button;
  };

  return Promise.all([
    provider.render(ResultsInfo, { })($resultInfo),
    provider.render(Facets, { })($facets),
    provider.render(ProductList, {
      routeProduct: (product) => rootLink(`/products/${product.urlKey}/${product.sku}`),
      ...categoryPathConfig,
      slots: {
        ProductActions: (ctx) => {
          const actionsWrapper = document.createElement('div');
          actionsWrapper.className = 'product-discovery-product-actions';
          // Add to Cart Button
          const addToCartBtn = getAddToCartButton(ctx.product);
          addToCartBtn.className = 'product-discovery-product-actions__add-to-cart';
          // Wishlist Button
          const $wishlistToggle = document.createElement('div');
          $wishlistToggle.classList.add('product-discovery-product-actions__wishlist-toggle');
          wishlistRender.render(WishlistToggle, {
            product: ctx.product,
          })($wishlistToggle);
          actionsWrapper.appendChild(addToCartBtn);
          actionsWrapper.appendChild($wishlistToggle);
          ctx.replaceWith(actionsWrapper);
        },
      },
    })($productList),
  ]);
}
