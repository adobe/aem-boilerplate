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
  // TODO: replace with consistent demo backend
  setEndpoint(
    commerceEndpoint,
    // Prod Mesh Endpoint w/ Guest Estimate
    // 'https://graph.adobe.io/api/dc55dc16-82b2-47ec-8e5a-3e9f3cf395dd/graphql?api_key=cfc0b282731a43739c83eb661ab17086'
    // Stg Mesh Endpoint w/ Guest Estimate & Adyen Extension
    // 'https://graph.adobe.io/api/a2975be6-bfb1-4be5-bb9b-b330fd46a6d8/graphql?api_key=a28717f2dc814395a2b536d527ef9ad5',
    // Stg Backend ^ but without Mesh - wont work until CORS resolved for local dev.
    // 'https://checkout-stg-phpgo3q-ktefqhpptmkrc.eu-4.magentosite.cloud/graphql',
  );

  initializers.register(checkoutApi.initialize, {
    cartId: store.getCartId(),
  });

  initializers.register(adyenApi.initialize, {
    clientKey: 'test_TBG272DDJZH4ZAAXSBAKQZ44ZQC6LWOU',
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

            const $content = document.createElement('div');
            $content.innerText = 'Custom Check / Money order handler';

            ctx.appendHTMLElement($content);
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
}
