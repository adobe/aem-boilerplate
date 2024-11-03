"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = void 0;
const api_1 = require("@/order/api");
const cancelOrderMutation_1 = require("./graphql/cancelOrderMutation");
const fetch_error_1 = require("@/order/lib/fetch-error");
const transforms_1 = require("@/order/data/transforms");
const cancelOrder = async (orderId, reason, onSuccess, onError) => {
    if (!orderId)
        throw new Error('No order ID found');
    if (!reason)
        throw new Error('No reason found');
    return (0, api_1.fetchGraphQl)(cancelOrderMutation_1.CANCEL_ORDER_MUTATION, {
        variables: {
            orderId,
            reason,
        },
    }).then(({ errors, data }) => {
        if (errors)
            return (0, fetch_error_1.handleFetchError)(errors);
        if (data.cancelOrder.error != null) {
            onError();
            return;
        }
        const orderData = (0, transforms_1.transformOrderData)(data.cancelOrder.order);
        onSuccess(orderData);
    });
};
exports.cancelOrder = cancelOrder;
