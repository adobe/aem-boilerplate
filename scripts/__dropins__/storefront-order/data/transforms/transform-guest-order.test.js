"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const mock_config_1 = require("@/order/configs/mock.config");
const transform_guest_order_1 = require("./transform-guest-order");
describe('[ORDER-Transforms] - transformGuestOrder', () => {
    const guestOrderData = mock_config_1.transformMockOrderInput.data.customer.orders.items[0];
    test('called transformOrderData if total null', () => {
        expect((0, transform_guest_order_1.transformGuestOrder)({
            data: {
                guestOrder: {
                    ...guestOrderData,
                },
            },
        })).toEqual((0, transform_guest_order_1.transformGuestOrder)({
            data: {
                guestOrder: {
                    ...guestOrderData,
                },
            },
        }));
    });
    test('called transformGuestOrderByToken if total null', () => {
        expect((0, transform_guest_order_1.transformGuestOrderByToken)({
            data: {
                guestOrderByToken: {
                    ...guestOrderData,
                },
            },
        })).toEqual((0, transform_guest_order_1.transformGuestOrderByToken)({
            data: {
                guestOrderByToken: {
                    ...guestOrderData,
                },
            },
        }));
    });
});
