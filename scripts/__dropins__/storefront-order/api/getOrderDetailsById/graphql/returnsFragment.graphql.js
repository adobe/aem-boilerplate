"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RETURNS_FRAGMENT = void 0;
exports.RETURNS_FRAGMENT = `
  fragment OrderReturns on Returns {
  __typename
   items {
    number
    status
    shipping {
      tracking {
        status {
          text
          type
        }
        carrier {
          uid
          label
        }
        tracking_number
      }
    }
    order {
      number
      token
    }
    items {
     uid
     quantity
     status
     request_quantity
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
  }
`;
