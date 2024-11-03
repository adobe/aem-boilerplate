"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const tests_1 = require("@adobe/elsie/lib/tests");
const useGetStoreConfig_1 = require("@/order/hooks/api/useGetStoreConfig");
const api_1 = require("@/order/api");
jest.mock('@/order/api/getStoreConfig');
describe('[ORDER-hooks] - useGetStoreConfigs', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('initially set config to null', async () => {
        api_1.getStoreConfig.mockResolvedValueOnce({
            data: null,
            errors: null,
        });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useGetStoreConfig_1.useGetStoreConfig)());
        expect(result.current).toBeNull();
    });
    test('updates config with data after successful fetch', async () => {
        sessionStorage.removeItem('orderStoreConfig');
        api_1.getStoreConfig.mockResolvedValueOnce({
            orderCancellationEnabled: true,
            orderCancellationReasons: [
                { description: 'The order was placed by mistake' },
            ],
        });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useGetStoreConfig_1.useGetStoreConfig)());
        await (0, tests_1.waitFor)(() => {
            expect(result.current).toEqual({
                orderCancellationEnabled: true,
                orderCancellationReasons: [
                    { description: 'The order was placed by mistake' },
                ],
            });
        });
    });
    test('useGetStoreConfig get data from session storage if possible', async () => {
        sessionStorage.setItem('orderStoreConfig', JSON.stringify({
            orderCancellationEnabled: true,
            orderCancellationReasons: [
                { description: 'The order was placed by mistake' },
            ],
        }));
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useGetStoreConfig_1.useGetStoreConfig)());
        await (0, tests_1.waitFor)(() => {
            expect(result.current).toEqual({
                orderCancellationEnabled: true,
                orderCancellationReasons: [
                    { description: 'The order was placed by mistake' },
                ],
            });
        });
    });
    test('return null if sessionStorage empty and getStoreConfig empty', async () => {
        sessionStorage.removeItem('orderStoreConfig');
        api_1.getStoreConfig.mockResolvedValueOnce(null);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useGetStoreConfig_1.useGetStoreConfig)());
        expect(result.current).toBeNull();
    });
});
