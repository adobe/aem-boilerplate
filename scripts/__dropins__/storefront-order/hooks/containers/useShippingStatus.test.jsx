"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_hooks_1 = require("@testing-library/react-hooks");
const useShippingStatus_1 = require("./useShippingStatus");
const event_bus_1 = require("@adobe/event-bus");
const mock_config_1 = require("@/order/configs/mock.config");
describe('[ORDER-HOOKS] - useShippingStatus', () => {
    test('should return order hook prop', () => {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useShippingStatus_1.useShippingStatus)({ orderData: mock_config_1.transformMockOrderOutput }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
    test('should return order/data with events => emit', () => {
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useShippingStatus_1.useShippingStatus)({ orderData: null }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
});
