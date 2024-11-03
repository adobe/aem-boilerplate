"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/order/api");
const fetch_error_1 = require("@/order/lib/fetch-error");
const cancelOrderMutation_1 = require("./graphql/cancelOrderMutation");
const cancelOrder_1 = require("@/order/api/cancelOrder/cancelOrder");
// mock fetchGraphQl
jest.mock('@/order/api', () => ({
    fetchGraphQl: jest.fn(),
}));
// mock handleFetchError
jest.mock('@/order/lib/fetch-error', () => ({
    handleFetchError: jest.fn(),
}));
// mock event bus
jest.mock('@adobe/event-bus', () => ({
    events: {
        emit: jest.fn(),
    },
}));
describe('Order/api/cancelOrder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('cancelOrder', () => {
        const orderId = '123';
        const reason = 'Lorem';
        test('calls fetchGraphQl with CANCEL_ORDER_MUTATION', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
                data: {
                    cancelOrder: {
                        error: null,
                        order: {
                            status: 'cancelled',
                        },
                    },
                },
            })));
            await (0, cancelOrder_1.cancelOrder)(orderId, reason, () => { }, () => { });
            expect(api_1.fetchGraphQl).toHaveBeenCalledTimes(1);
            expect(api_1.fetchGraphQl.mock.calls[0][0]).toBe(cancelOrderMutation_1.CANCEL_ORDER_MUTATION);
            expect(api_1.fetchGraphQl.mock.calls[0][1])
                .toMatchInlineSnapshot(`
{
  "variables": {
    "orderId": "123",
    "reason": "Lorem",
  },
}
`);
        });
        test('handles graphql fetch error', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({ errors: ['error'] })));
            await (0, cancelOrder_1.cancelOrder)(orderId, reason, () => { }, () => { });
            expect(api_1.fetchGraphQl).toHaveBeenCalledTimes(1);
            expect(fetch_error_1.handleFetchError).toHaveBeenCalledTimes(1);
        });
        test('throws error if no orderId is found', async () => {
            await expect((0, cancelOrder_1.cancelOrder)('', reason, () => { }, () => { })).rejects.toThrow('No order ID found');
        });
        test('throws error if no reason parameter is found', async () => {
            // @ts-ignore
            await expect((0, cancelOrder_1.cancelOrder)(orderId, null)).rejects.toThrow('No reason found');
        });
        test('returns the order status after cancellation without error_message', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
                data: {
                    cancelOrder: {
                        error: null,
                        order: {
                            status: 'cancelled',
                        },
                    },
                },
            })));
            const result = await (0, cancelOrder_1.cancelOrder)(orderId, reason, () => { }, () => { });
            expect(result).toMatchInlineSnapshot(`undefined`);
        });
    });
});
