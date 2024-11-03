"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const react_hooks_1 = require("@testing-library/react-hooks");
const useOrderCostSummary_1 = require("./useOrderCostSummary");
const event_bus_1 = require("@adobe/event-bus");
const mock_config_1 = require("@/order/configs/mock.config");
const setTaxStatus_1 = require("@/order/lib/setTaxStatus");
const api_1 = require("@/order/api");
jest.mock('@/order/lib/setTaxStatus');
jest.mock('@/order/api/getStoreConfig');
describe('[ORDER-HOOKS] - useOrderCostSummary', () => {
    test('should return order hook prop', () => {
        api_1.getStoreConfig.mockResolvedValue({
            shoppingCartDisplayPrice: 1,
        });
        setTaxStatus_1.setTaxStatus.mockReturnValue({
            taxIncluded: true,
            taxExcluded: true,
        });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderCostSummary_1.useOrderCostSummary)({ orderData: mock_config_1.transformMockOrderOutput }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
    test('should return order/data with events => emit', () => {
        api_1.getStoreConfig.mockResolvedValue(null);
        setTaxStatus_1.setTaxStatus.mockReturnValue({
            taxIncluded: false,
            taxExcluded: false,
        });
        event_bus_1.events.emit('order/data', mock_config_1.transformMockOrderOutput);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useOrderCostSummary_1.useOrderCostSummary)({ orderData: null }));
        expect(result.current.order).toBe(mock_config_1.transformMockOrderOutput);
    });
});
