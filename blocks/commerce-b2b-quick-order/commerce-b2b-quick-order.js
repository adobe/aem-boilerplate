import { Header, provider as UI } from '@dropins/tools/components.js';

// Quick Order Drop-in
import { render as quickOrderProvider } from '@dropins/storefront-quick-order/render.js';
import QuickOrderMultipleSku from '@dropins/storefront-quick-order/containers/QuickOrderMultipleSku.js';
import QuickOrderCsvUpload from '@dropins/storefront-quick-order/containers/QuickOrderCsvUpload.js';
import QuickOrderItems from '@dropins/storefront-quick-order/containers/QuickOrderItems.js';

// PDP Drop-in
import { render as pdpProvider } from '@dropins/storefront-pdp/render.js';
import ProductPrice from '@dropins/storefront-pdp/containers/ProductPrice.js';
import ProductOptions from '@dropins/storefront-pdp/containers/ProductOptions.js';
import * as pdpApi from '@dropins/storefront-pdp/api.js';

// Cart Drop-in
import * as cartApi from '@dropins/storefront-cart/api.js';

// Product Discovery Drop-in
import * as searchApi from '@dropins/storefront-product-discovery/api.js';

// Commerce
import { rootLink } from '../../scripts/commerce.js';

// Initializers
import '../../scripts/initializers/quick-order.js';
import '../../scripts/initializers/search.js';
import '../../scripts/initializers/cart.js';
import '../../scripts/initializers/pdp.js';

export default async function decorate(block) {
  // Stores rendered ProductOptions containers by scope, prevent redundant container re-rendering
  const productOptionsContainerMap = new Map();

  const fragment = document.createRange().createContextualFragment(`
    <div class="quick-order-title"></div>
    <div class="quick-order-main-container">
      <div class="quick-order-items-container"></div>
      <div class="quick-order-right-side">
        <div class="quick-order-multiple-sku-container"></div>
        <div class="quick-order-csv-upload-container"></div>
      </div>
    </div>
  `);

  block.appendChild(fragment);

  const quickOrderTitleContainer = block.querySelector('.quick-order-title');
  const quickOrderItemsContainer = block.querySelector('.quick-order-items-container');
  const quickOrderMultipleSkuContainer = block.querySelector('.quick-order-multiple-sku-container');
  const quickOrderCsvUploadContainer = block.querySelector('.quick-order-csv-upload-container');

  UI.render(Header, { title: 'Quick Order', size: 'large', divider: true })(
    quickOrderTitleContainer,
  );

  quickOrderProvider.render(QuickOrderItems, {
    getProductsData: pdpApi.getProductsData,
    productsSearch: searchApi.search,
    searchFilter: [
      {
        attribute: 'categoryPath',
        eq: '',
      },
      {
        attribute: 'visibility',
        in: ['Search', 'Catalog, Search'],
      },
    ],
    className: 'quick-order-items',
    handleAddToCart: async (values) => {
      if (!values.length) return;
      const cartItems = values.map((item) => ({
        ...item,
        sku: item.parentSku || item.sku,
      }));
      try {
        await cartApi.addProductsToCart(cartItems);
        window.location.href = rootLink('/cart');
      } catch (error) {
        // Return an error message string to display a notification
        // eslint-disable-next-line consistent-return
        return error.message || 'Failed to add products to cart.';
      }
    },
    slots: {
      ProductPrice: (ctx) => {
        const priceContainer = document.createElement('div');
        priceContainer.className = 'product-price-slot';
        pdpProvider.render(ProductPrice, {
          scope: ctx.scope,
          initialData: ctx.item,
        })(priceContainer);

        ctx.replaceWith(priceContainer);
      },
      ProductOptions: (ctx) => {
        // Preventing re-creating duplicated containers
        let productOptionsContainer = productOptionsContainerMap.get(ctx.scope);

        if (!productOptionsContainer) {
          // Create a new container only if not exist yet
          productOptionsContainer = document.createElement('div');
          productOptionsContainer.className = 'product-options-slot';
          pdpProvider.render(ProductOptions, {
            scope: ctx.scope,
          })(productOptionsContainer);

          productOptionsContainerMap.set(ctx.scope, productOptionsContainer);
        }

        ctx.replaceWith(productOptionsContainer);
      },
    },
  })(quickOrderItemsContainer);

  quickOrderProvider.render(QuickOrderMultipleSku, {
    className: 'quick-order-multiple-sku',
  })(quickOrderMultipleSkuContainer);

  quickOrderProvider.render(QuickOrderCsvUpload, {
    className: 'quick-order-csv-upload',
  })(quickOrderCsvUploadContainer);
}
