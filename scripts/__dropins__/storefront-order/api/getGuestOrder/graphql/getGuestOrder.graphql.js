"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_GUEST_ORDER = exports.GUEST_ORDER_FRAGMENT = void 0;
const graphql_1 = require("@/order/api/getOrderDetailsById/graphql");
exports.GUEST_ORDER_FRAGMENT = `
  fragment guestOrderData on CustomerOrder {
    email
    id
    number
    order_date
    order_status_change_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
    returns {
      ...OrderReturns
    }
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
    id
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
${graphql_1.PRODUCT_DETAILS_FRAGMENT}
${graphql_1.PRICE_DETAILS_FRAGMENT}
${graphql_1.GIFT_CARD_DETAILS_FRAGMENT}
${graphql_1.ORDER_ITEM_DETAILS_FRAGMENT}
${graphql_1.BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT}
${graphql_1.ORDER_SUMMARY}
${graphql_1.ADDRESS}
${graphql_1.RETURNS_FRAGMENT}
`;
exports.GET_GUEST_ORDER = `
  query GET_GUEST_ORDER($input: OrderInformationInput!) {
  guestOrder(input:$input) {
    ...guestOrderData
    }
  }
${exports.GUEST_ORDER_FRAGMENT}
`;
