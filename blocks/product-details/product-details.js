/* eslint-disable import/no-unresolved */
import { initializers } from '@dropins/elsie/initializer.js';
import * as productApi from '@dropins/storefront-pdp/api.js';
import ProductDetails from '@dropins/storefront-pdp/containers/ProductDetails.js';
import { render as productRenderer } from '@dropins/storefront-pdp/render.js';
import { getConfigValue } from '../../scripts/configs.js';
import { getSkuFromUrl } from '../../scripts/commerce.js';

export default async function decorate(block) {
  const commerceEndpoint = await getConfigValue('commerce-endpoint');
  productApi.setEndpoint(commerceEndpoint);

  productApi.setFetchGraphQlHeaders({
    'Content-Type': 'application/json',
    'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
    'Magento-Website-Code': await getConfigValue('commerce-website-code'),
    'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
    'Magento-Store-Code': await getConfigValue('commerce-store-code'),
    'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
    'x-api-key': await getConfigValue('commerce-x-api-key'),
  });
  initializers.register(productApi.initialize);

  const heading = document.createElement('h2');
  heading.classList.add('pdp-product__heading');
  heading.textContent = 'product description';

  productRenderer.render(ProductDetails, {
    sku: getSkuFromUrl(),
    hideQuantity: false,
    slots: {
      Actions: (ctx) => {
        // Add to Cart Button
        ctx.appendButton({
          text: 'Add to Cart',
          icon: 'cart',
          variant: 'primary',
          onClick: async () => {
            const { cartApi } = await import('../../scripts/minicart/api.js');
            const { sku, options = [], quantity } = ctx.values;
            console.debug('Add to Cart', sku, options, quantity);
            cartApi.addToCart(sku, options, quantity);
          },
        });

        // Add to Wishlist Button
        ctx.appendButton({
          icon: 'Heart',
          variant: 'primary',
          onClick: () => console.debug('Add to Wishlist', ctx.data),
        });

        // Add Product Details Description header
        ctx.appendHTMLElement(heading);
      },
    },
  })(block);
}
