"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/order/api");
const fetch_error_1 = require("@/order/lib/fetch-error");
const requestGuestOrderCancelMutation_1 = require("./graphql/requestGuestOrderCancelMutation");
const cancelOrder_1 = require("@/order/api/cancelOrder/cancelOrder");
const requestGuestOrderCancel_1 = require("@/order/api/requestGuestOrderCancel/requestGuestOrderCancel");
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
describe('Order/api/requestGuestCancelOrder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('cancelOrder', () => {
        const token = 'MQ==';
        const reason = 'Lorem';
        test('calls fetchGraphQl with REQUEST_GUEST_ORDER_CANCEL_MUTATION', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({
                data: {
                    requestGuestOrderCancel: {
                        error: null,
                        order: {
                            status: 'cancelled',
                        },
                    },
                },
            })));
            await (0, requestGuestOrderCancel_1.requestGuestOrderCancel)(token, reason, () => { }, () => { });
            expect(api_1.fetchGraphQl).toHaveBeenCalledTimes(1);
            expect(api_1.fetchGraphQl.mock.calls[0][0]).toBe(requestGuestOrderCancelMutation_1.REQUEST_GUEST_ORDER_CANCEL_MUTATION);
            expect(api_1.fetchGraphQl.mock.calls[0][1])
                .toMatchInlineSnapshot(`
{
  "variables": {
    "reason": "Lorem",
    "token": "MQ==",
  },
}
`);
        });
        test('handles graphql fetch error', async () => {
            api_1.fetchGraphQl.mockReturnValue(new Promise((resolve) => resolve({ errors: ['error'] })));
            await (0, requestGuestOrderCancel_1.requestGuestOrderCancel)(token, reason, () => { }, () => { });
            expect(api_1.fetchGraphQl).toHaveBeenCalledTimes(1);
            expect(fetch_error_1.handleFetchError).toHaveBeenCalledTimes(1);
        });
        test('throws error if no token is found', async () => {
            await expect((0, requestGuestOrderCancel_1.requestGuestOrderCancel)(null, reason, () => { }, () => { })).rejects.toThrow('No order token found');
        });
        test('throws error if no reason parameter is found', async () => {
            // @ts-ignore
            await expect((0, requestGuestOrderCancel_1.requestGuestOrderCancel)(token, null, () => { }, () => { })).rejects.toThrow('No reason found');
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
            const result = await (0, cancelOrder_1.cancelOrder)(token, reason, () => { }, () => { });
            expect(result).toMatchInlineSnapshot(`undefined`);
        });
    });
});
