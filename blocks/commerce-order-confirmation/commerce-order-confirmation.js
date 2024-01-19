/* eslint-disable import/no-unresolved */
import { setEndpoint } from '@dropins/elsie/fetch-graphql.js';
import { initializers } from '@dropins/elsie/initializer.js';
import * as orderConfirmationApi from '@dropins/storefront-order-confirmation/api.js';
import { render as orderConfirmationRenderer } from '@dropins/storefront-order-confirmation/render.js';
import { OrderConfirmation } from '@dropins/storefront-order-confirmation/containers/OrderConfirmation.js';
import { getConfigValue } from '../../scripts/configs.js';

export default async function decorate(block) {
  const commerceEndpoint = await getConfigValue('commerce-core-endpoint');
  setEndpoint(commerceEndpoint);

  const params = new URLSearchParams(window.location.search);
  const orderRef = params.get('orderRef');

  initializers.register(orderConfirmationApi.initialize, {});

  orderConfirmationRenderer.render(OrderConfirmation, {
    orderRef,
    onContinueShopping: () => console.log('continue shopping'),
  })(block);
}
