"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestGuestOrderCancel = void 0;
const api_1 = require("@/order/api");
const requestGuestOrderCancelMutation_1 = require("./graphql/requestGuestOrderCancelMutation");
const fetch_error_1 = require("@/order/lib/fetch-error");
const transforms_1 = require("@/order/data/transforms");
const requestGuestOrderCancel = async (token, reason, onSuccess, onError) => {
    if (!token)
        throw new Error('No order token found');
    if (!reason)
        throw new Error('No reason found');
    return (0, api_1.fetchGraphQl)(requestGuestOrderCancelMutation_1.REQUEST_GUEST_ORDER_CANCEL_MUTATION, {
        variables: {
            token,
            reason,
        },
    }).then(({ errors, data }) => {
        if (errors)
            return (0, fetch_error_1.handleFetchError)(errors);
        if (data.requestGuestOrderCancel.error != null) {
            onError();
            return false;
        }
        const orderData = (0, transforms_1.transformOrderData)(data.requestGuestOrderCancel.order);
        onSuccess(orderData);
        return true;
    });
};
exports.requestGuestOrderCancel = requestGuestOrderCancel;
