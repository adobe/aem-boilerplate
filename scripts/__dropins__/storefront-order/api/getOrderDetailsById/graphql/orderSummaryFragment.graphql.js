"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_SUMMARY = void 0;
exports.ORDER_SUMMARY = `
fragment OrderSummary on OrderTotal {
  grand_total {
    value
    currency
  }
  total_giftcard {
    currency
    value
  }
  subtotal {
    currency
    value
  }
  taxes {
    amount {
      currency
      value
    }
    rate
    title
  }
  total_tax {
    currency
    value
  }
  total_shipping {
    currency
    value
  }
  discounts {
    amount {
      currency
      value
    }
    label
  }
}`;
