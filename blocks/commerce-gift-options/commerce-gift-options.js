/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import GiftOptions from '@dropins/storefront-cart/containers/GiftOptions.js';
import { render as CartProvider } from '@dropins/storefront-cart/render.js';

export default async function decorate(block) {
  await CartProvider.render(GiftOptions, {
    view: 'order',
    dataSource: 'order',
    isEditable: false,
    readOnlyFormOrderView: 'secondary',
  })(block);
}
