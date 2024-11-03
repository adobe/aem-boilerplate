"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CANCEL_ORDER_MUTATION = void 0;
const graphql_1 = require("@/order/api/getOrderDetailsById/graphql");
exports.CANCEL_ORDER_MUTATION = `
mutation CANCEL_ORDER_MUTATION($orderId: ID!, $reason: String!) {
  cancelOrder(input: { order_id: $orderId, reason: $reason }) {
    error
    order {
      email
      available_actions
      status
      number
      id
      order_date
      carrier
      shipping_method
      is_virtual
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
${graphql_1.PRODUCT_DETAILS_FRAGMENT}
${graphql_1.PRICE_DETAILS_FRAGMENT}
${graphql_1.GIFT_CARD_DETAILS_FRAGMENT}
${graphql_1.ORDER_ITEM_DETAILS_FRAGMENT}
${graphql_1.BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT}
${graphql_1.ORDER_SUMMARY}
${graphql_1.ADDRESS}  
`;
