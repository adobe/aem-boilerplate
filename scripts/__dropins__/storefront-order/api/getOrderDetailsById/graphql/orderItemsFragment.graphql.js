"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT = exports.ORDER_ITEM_DETAILS_FRAGMENT = exports.GIFT_CARD_DETAILS_FRAGMENT = exports.PRICE_DETAILS_FRAGMENT = exports.PRODUCT_DETAILS_FRAGMENT = void 0;
exports.PRODUCT_DETAILS_FRAGMENT = `
  fragment ProductDetails on ProductInterface {
    __typename
    canonical_url
    url_key
    uid
    name
    sku
    only_x_left_in_stock
    stock_status
    thumbnail {
      label
      url
    }
    price_range {
      maximum_price {
        regular_price {
          currency
          value
        }
      }
    }
  }
`;
exports.PRICE_DETAILS_FRAGMENT = `
  fragment PriceDetails on OrderItemInterface {
    prices {
      price_including_tax {
        value
        currency
      }
      original_price {
        value
        currency
      }
      original_price_including_tax {
        value
        currency
      }
      price {
        value
        currency
      }
    }
  }
`;
exports.GIFT_CARD_DETAILS_FRAGMENT = `
  fragment GiftCardDetails on GiftCardOrderItem {
    ...PriceDetails
    gift_message {
      message
    }
    gift_card {
      recipient_name
      recipient_email
      sender_name
      sender_email
      message
    }
  }
`;
exports.ORDER_ITEM_DETAILS_FRAGMENT = `
  fragment OrderItemDetails on OrderItemInterface {
    __typename
    status
    product_name
    product_url_key
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_returned
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...ProductDetails
    }
    ...PriceDetails
  }
`;
exports.BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT = `
  fragment BundleOrderItemDetails on BundleOrderItem {
    ...PriceDetails
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`;
