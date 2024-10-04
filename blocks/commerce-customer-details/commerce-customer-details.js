/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { render as orderRenderer } from '@dropins/storefront-order/render.js';
import { CustomerDetails } from '@dropins/storefront-order/containers/CustomerDetails.js';

export default async function decorate(block) {
  await orderRenderer.render(CustomerDetails, {})(block);
}
