"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_CUSTOMER_ORDERS_RETURN = void 0;
const graphql_1 = require("../../getOrderDetailsById/graphql");
exports.GET_CUSTOMER_ORDERS_RETURN = `
query GET_CUSTOMER_ORDERS_RETURN {
 customer {
  returns {
    page_info {
      page_size
      total_pages
      current_page
    }
    ...OrderReturns
  }
 }
}
${graphql_1.RETURNS_FRAGMENT}
${graphql_1.PRODUCT_DETAILS_FRAGMENT}
${graphql_1.PRICE_DETAILS_FRAGMENT}
${graphql_1.GIFT_CARD_DETAILS_FRAGMENT}
${graphql_1.ORDER_ITEM_DETAILS_FRAGMENT}
`;
