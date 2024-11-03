"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_RETURNS_BY_TOKEN = exports.ORDER_RETURNS_BY_NUMBER = void 0;
const getCustomerOrdersReturn_graphql_1 = require("../../getCustomerOrdersReturn/graphql/getCustomerOrdersReturn.graphql");
exports.ORDER_RETURNS_BY_NUMBER = `
query ORDER_RETURNS_BY_NUMBER($orderNumber: String!) {
 customer {
    orders(
      filter: { number: { eq: $orderNumber } }
    ) {
      items {
        returns {
        ...OrderReturns
        }
      }
    }
  }
}
${getCustomerOrdersReturn_graphql_1.RETURNS_FRAGMENT}
`;
exports.ORDER_RETURNS_BY_TOKEN = `
query ORDER_RETURNS_BY_TOKEN($token: String!) {
 guestOrderByToken(input: { token: $token }) {
        returns {
        ...OrderReturns
      }
    }
  }
}
${getCustomerOrdersReturn_graphql_1.RETURNS_FRAGMENT}
`;
