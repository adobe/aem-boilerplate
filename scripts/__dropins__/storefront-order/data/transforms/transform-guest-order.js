"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformGuestOrderByToken = exports.transformGuestOrder = void 0;
const transform_order_details_1 = require("./transform-order-details");
const transformGuestOrder = (response) => {
    if (!response?.data?.guestOrder)
        return null;
    const guestOrder = response?.data?.guestOrder;
    return (0, transform_order_details_1.transformOrderData)(guestOrder);
};
exports.transformGuestOrder = transformGuestOrder;
const transformGuestOrderByToken = (response) => {
    if (!response?.data?.guestOrderByToken)
        return null;
    const guestOrderByToken = response?.data?.guestOrderByToken;
    return (0, transform_order_details_1.transformOrderData)(guestOrderByToken);
};
exports.transformGuestOrderByToken = transformGuestOrderByToken;
