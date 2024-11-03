"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useConfirmCancelOrder_1 = require("@/order/hooks/containers/useConfirmCancelOrder");
const react_hooks_1 = require("@testing-library/react-hooks");
const tests_1 = require("@adobe/elsie/lib/tests");
const confirmCancelOrder_1 = require("@/order/api/confirmCancelOrder/confirmCancelOrder");
const Provider_1 = require("@/order/render/Provider");
const wrapper = ({ children }) => <Provider_1.Provider>{children}</Provider_1.Provider>;
jest.mock('@/order/api/confirmCancelOrder/confirmCancelOrder');
const deleteWindowLocation = () => {
    try {
        // @ts-ignore
        delete window.location;
    }
    catch (e) { }
};
describe('[ORDER-hooks] - useConfirmCancelOrder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        deleteWindowLocation();
        Object.defineProperty(window, 'location', {
            value: {
                href: 'https://example.com',
            },
            writable: true,
        });
    });
    test('Order cancellation is not performed if feature is not enabled', () => {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({
            enableOrderCancellation: false,
        }), { wrapper });
        expect(result.current.confirmOrderCancellation).toStrictEqual({
            text: '',
            status: undefined,
        });
    });
    test('Order cancellation is successfully confirmed when all URL parameters are correct', async () => {
        window.location.search =
            '?orderId=MTU=&confirmationKey=o5o5IOW1akOg0E7QyZkdKrySowfaLnWO';
        confirmCancelOrder_1.confirmCancelOrder.mockResolvedValue({
            data: {
                confirmCancelOrder: {
                    errorV2: {},
                    order: { status: 'Canceled' },
                },
            },
        });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({ enableOrderCancellation: true }), { wrapper });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.confirmOrderCancellation).toStrictEqual({
                text: 'This order was cancelled by you. You should see a refund to your original payment method with 5-7 business days.',
                status: 'success',
            });
        });
    });
    test('Order cancellation was previously executed', async () => {
        window.location.search =
            '?orderId=MTU=&confirmationKey=o5o5IOW1akOg0E7QyZkdKrySowfaLnWO';
        confirmCancelOrder_1.confirmCancelOrder.mockRejectedValue({
            message: 'Order already closed, complete, cancelled or on hold',
        });
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({ enableOrderCancellation: true }), { wrapper });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.confirmOrderCancellation).toStrictEqual({
                text: 'Order already closed, complete, cancelled or on hold',
                status: 'warning',
            });
        });
    });
    test('Order cancellation is not performed when some parameters are missing', async () => {
        window.location.search = '?orderId=MTU=';
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({ enableOrderCancellation: true }), { wrapper });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.confirmOrderCancellation).toStrictEqual({
                text: '',
                status: undefined,
            });
        });
    });
    test('Order cancellation is not performed when some parameters are incorrect', async () => {
        window.location.search = '?orderId=MTU=&confirmationKey=123';
        confirmCancelOrder_1.confirmCancelOrder.mockResolvedValue(null);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({ enableOrderCancellation: true }), { wrapper });
        await (0, tests_1.waitFor)(() => {
            expect(result.current.confirmOrderCancellation).toStrictEqual({
                text: '',
                status: undefined,
            });
        });
    });
    test('Order cancellation is not performed when confirmCancelOrder does not resolve', async () => {
        window.location.search =
            '?oId=MTU=&confirmationKey=o5o5IOW1akOg0E7QyZkdKrySowfaLnWO';
        confirmCancelOrder_1.confirmCancelOrder.mockResolvedValue(null);
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({ enableOrderCancellation: true }));
        expect(result.current.confirmOrderCancellation).toEqual({
            text: '',
            status: undefined,
        });
    });
});
