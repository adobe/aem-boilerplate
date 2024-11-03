"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const getCustomerOrdersReturn_1 = require("@/order/api/getCustomerOrdersReturn");
const tests_1 = require("@adobe/elsie/lib/tests");
const useReturnsList_1 = require("@/order/hooks/containers/useReturnsList");
const mock_config_1 = require("@/order/configs/mock.config");
jest.mock('@/order/api/getCustomerOrdersReturn', () => ({
    getCustomerOrdersReturn: jest.fn(),
}));
describe('[ORDER-HOOKS] - useReturnsList', () => {
    const pageInfo = {
        pageSize: 1,
        totalPages: 1,
        currentPage: 1,
    };
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('return empty list', async () => {
        getCustomerOrdersReturn_1.getCustomerOrdersReturn.mockResolvedValueOnce({});
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useReturnsList_1.useReturnsList)());
        expect(result.current.loading).toBe(true);
        expect(result.current.selectedPage).toBe(1);
        (0, react_hooks_1.act)(async () => {
            result.current.handleSetSelectPage(4);
        });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.selectedPage).toBe(4);
            expect(result.current.loading).toBe(false);
            expect(result.current.pageInfo).toEqual(pageInfo);
            expect(result.current.orderReturns).toEqual([]);
        });
    });
    test('return full data', async () => {
        getCustomerOrdersReturn_1.getCustomerOrdersReturn.mockResolvedValueOnce({
            ordersReturn: mock_config_1.returnOrderListMock,
            pageInfo: { ...pageInfo, pageSize: 20 },
        });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useReturnsList_1.useReturnsList)());
        await (0, tests_1.waitFor)(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.orderReturns).toEqual(mock_config_1.returnOrderListMock);
            expect(result.current.pageInfo).toEqual({ ...pageInfo, pageSize: 20 });
        });
    });
});
