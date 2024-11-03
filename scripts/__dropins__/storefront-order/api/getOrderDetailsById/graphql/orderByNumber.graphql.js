"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_BY_NUMBER = void 0;
const customerAddressFragment_graphql_1 = require("./customerAddressFragment.graphql");
const orderItemsFragment_graphql_1 = require("./orderItemsFragment.graphql");
const orderSummaryFragment_graphql_1 = require("./orderSummaryFragment.graphql");
const returnsFragment_graphql_1 = require("./returnsFragment.graphql");
exports.ORDER_BY_NUMBER = `
query ORDER_BY_NUMBER($orderNumber: String!) {
 customer {
    orders(
      filter: { number: { eq: $orderNumber } }
    ) {
      items {
        email
        available_actions
        status
        number
        id
        order_date
        order_status_change_date
        carrier
        shipping_method
        is_virtual
        returns {
          ...OrderReturns
        }
        applied_coupons {
          code
        }
        shipments {
          id
          number
          tracking {
            title
            number
            carrier
          }
          comments {
            message
            timestamp
          }
          items {
            id
            product_sku
            product_name
            order_item {
              ...OrderItemDetails
              ... on GiftCardOrderItem {
                ...GiftCardDetails
                product {
                  ...ProductDetails
                }
              }
            }
          }
        }
        payment_methods {
          name
          type
        }
        shipping_address {
          ...AddressesList
        }
        billing_address {
          ...AddressesList
        }
        items {
          ...OrderItemDetails
          ... on BundleOrderItem {
            ...BundleOrderItemDetails
          }
          ... on GiftCardOrderItem {
            ...GiftCardDetails
            product {
              ...ProductDetails
            }
          }
          ... on DownloadableOrderItem {
            product_name
            downloadable_links {
              sort_order
              title
            }
          }
        }
        total {
          ...OrderSummary
        }
      }
    }
  }
}
${orderItemsFragment_graphql_1.PRODUCT_DETAILS_FRAGMENT}
${orderItemsFragment_graphql_1.PRICE_DETAILS_FRAGMENT}
${orderItemsFragment_graphql_1.GIFT_CARD_DETAILS_FRAGMENT}
${orderItemsFragment_graphql_1.ORDER_ITEM_DETAILS_FRAGMENT}
${orderItemsFragment_graphql_1.BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT}
${orderSummaryFragment_graphql_1.ORDER_SUMMARY}
${customerAddressFragment_graphql_1.ADDRESS}
${returnsFragment_graphql_1.RETURNS_FRAGMENT}
`;
