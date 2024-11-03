"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUEST_GUEST_ORDER_CANCEL_MUTATION = void 0;
const graphql_1 = require("@/order/api/getGuestOrder/graphql");
exports.REQUEST_GUEST_ORDER_CANCEL_MUTATION = `
mutation REQUEST_GUEST_ORDER_CANCEL_MUTATION($token: String!, $reason: String!) {
  requestGuestOrderCancel(input: { token: $token, reason: $reason }) {
    error
    order {
      ...guestOrderData
    }
  }
}
${graphql_1.GUEST_ORDER_FRAGMENT}
`;
