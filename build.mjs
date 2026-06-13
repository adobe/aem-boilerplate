import { overrideGQLOperations } from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  // ACCS does not have Downloadable Items
  {
    npm: '@dropins/storefront-cart',
    skipFragments: ['DOWNLOADABLE_CART_ITEMS_FRAGMENT'],
    operations: [],
  },
  {
    npm: '@dropins/storefront-order',
    skipFragments: ['DOWNLOADABLE_ORDER_ITEMS_FRAGMENT'],
    operations: [],
  },
  {
    npm: '@dropins/storefront-checkout',
    operations: [
      `
      fragment AVAILABLE_PAYMENT_METHOD_FRAGMENT on AvailablePaymentMethod {
        oope_payment_method_config {
          backend_integration_url
          custom_config {
            key
            value
          }
        }
      }
      `,
      `
      fragment SELECTED_PAYMENT_METHOD_FRAGMENT on SelectedPaymentMethod {
        oope_payment_method_config {
          backend_integration_url
          custom_config {
            key
            value
          }
        }
      }
      `,
    ],
  },
  // {
  //   npm: '@dropins/storefront-pdp',
  //   operations: [
  //     `
  //     fragment PRODUCT_FRAGMENT on ProductView {
  //       lowStock
  //     }
  //     `,
  //   ],
  // },
]);
