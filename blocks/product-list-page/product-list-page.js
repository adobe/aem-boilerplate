import ProductList from '@dropins/storefront-product-discovery/containers/ProductList.js';
import Facets from '@dropins/storefront-product-discovery/containers/Facets.js';
import ResultsInfo from '@dropins/storefront-product-discovery/containers/ResultsInfo.js';
import { render as provider } from '@dropins/storefront-product-discovery/render.js';
import { rootLink } from '../../scripts/scripts.js';
// import { readBlockConfig } from '../../scripts/aem.js';

// Initializers
import '../../scripts/initializers/search.js';

export default async function decorate(block) {
  // const config = readBlockConfig(block);

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

  return Promise.all([
    provider.render(ResultsInfo, { })($resultInfo),
    provider.render(Facets, { })($facets),
    provider.render(ProductList, {
      routeProduct: (product) => rootLink(`/products/${product.urlKey}/${product.sku}`),
    })($productList),
  ]);
}
