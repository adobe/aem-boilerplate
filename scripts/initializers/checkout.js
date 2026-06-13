import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setEndpoint } from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';
import { CORE_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  // Set Fetch GraphQL (Core)
  setEndpoint(CORE_FETCH_GRAPHQL);

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/checkout.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  // Initialize checkout — expose OOPE payment method config to dropin event payloads
  return initializers.mountImmediately(initialize, {
    langDefinitions,
    models: {
      CartModel: {
        // Strip oope_payment_method_config from payment method objects — if left
        // in, the dropin's input transformer passes it to setPaymentMethodOnCart
        // which the Commerce schema rejects (not a field of PaymentMethodInput).
        // Expose it separately as oopePaymentMethodConfigs for the Adyen slot.
        transformer: (data) => {
          const methods = data?.available_payment_methods ?? [];
          return {
            // eslint-disable-next-line camelcase
            availablePaymentMethods: methods.map(
              // eslint-disable-next-line camelcase
              ({ oope_payment_method_config: _, ...rest }) => rest,
            ),
            oopePaymentMethodConfigs: Object.fromEntries(
              // eslint-disable-next-line camelcase
              methods.map(({ code, oope_payment_method_config: cfg }) => [code, cfg]),
            ),
          };
        },
      },
    },
  });
})();
