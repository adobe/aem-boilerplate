"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_hooks_1 = require("@testing-library/react-hooks");
const useOrderStatus_1 = require("./useOrderStatus");
const types_1 = require("@/order/types");
const event_bus_1 = require("@adobe/event-bus");
const mock_config_1 = require("@/order/configs/mock.config");
describe('[ORDER-HOOKS] - useOrderStatus', () => {
    test('should return 0 if orderData is not provided', () => {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderStatus_1.useOrderStatus)({ orderData: null }));
        expect(result.current.orderStatus).toBeUndefined();
    });
    test('should return order status if order is canceled', () => {
        const orderData = { status: types_1.StatusEnumProps.CANCELED };
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderStatus_1.useOrderStatus)({ orderData }));
        expect(result.current.orderStatus).toBe(types_1.StatusEnumProps.CANCELED);
    });
    test('should return order/data with events => emit', () => {
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderStatus_1.useOrderStatus)({ orderData: null }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
});
