/* eslint-disable import/no-unresolved */
import * as adyenApi from '@dropins/adyen-checkout-extension/api.js';
import AdyenExtension from '@dropins/adyen-checkout-extension/containers/AdyenPaymentMethod.js';
import { render as adyenRenderer } from '@dropins/adyen-checkout-extension/render.js';
import { events } from '@dropins/elsie/event-bus.js';
import { setEndpoint } from '@dropins/elsie/fetch-graphql.js';
import { initializers } from '@dropins/elsie/initializer.js';
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import Checkout from '@dropins/storefront-checkout/containers/Checkout.js';
import { render as checkoutRenderer } from '@dropins/storefront-checkout/render.js';
import { getConfigValue } from '../../scripts/configs.js';
import { store } from '../../scripts/minicart/api.js';

/**
 * Example integration of Checkout Dropin + EDS.
 */
export default async function decorate(block) {
  const commerceEndpoint = await getConfigValue('commerce-core-endpoint');
  const adyenClientKey = await getConfigValue('adyen-client-key');

  setEndpoint(commerceEndpoint);

  initializers.register(checkoutApi.initialize, {
    cartId: store.getCartId(),
  });

  initializers.register(adyenApi.initialize, {
    clientKey: adyenClientKey,
    locale: 'en-US',
    environment: 'test',
  });

  checkoutRenderer.render(Checkout, {
    slots: {
      PaymentMethods: async (context) => {
        context.addPaymentMethodHandler('adyen_cc', {
          render: (ctx, element) => {
            if (element) {
              // clear the element first
              element.innerHTML = '';
              adyenRenderer.render(AdyenExtension, ctx)(element);
            }
          },
        });
        context.addPaymentMethodHandler('checkmo', {
          render: (ctx, element) => {
            if (element) {
              // clear the element first
              element.innerHTML = '';
            }

            // Optionally, create and render some custom content here.
            // const $content = document.createElement('div');
            // $content.innerText = 'Custom Check / Money order handler';
            // ctx.appendHTMLElement($content);
          },
        });
      },
    },
  })(block);
  //--------------------
  // Debugging
  window.events = events;
  // If getCartId is not wired up or does not actually have a cart id,
  // you'll need to create and provide one to the Dropin via events:
  //
  // events.emit('cart/data', { id: 'xA2iLSMcX90tHXGgQ4QqTNWm8psIdwbu'})
  //
  // If you want to demonstrate changing locale, emit an event like so:
  //
  // events.emit('locale', 'en_US')
  //--------------------
  events.on('checkout/order', (data) => {
    console.log('order placed successfully');
    // redirect to order confirmation page
    window.location.replace(`/order-confirmation?orderRef=${data.masked_order_id}`);
  });
}
