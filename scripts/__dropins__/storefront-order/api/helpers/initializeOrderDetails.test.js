"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/order/api");
const tests_1 = require("@adobe/elsie/lib/tests");
const transforms_1 = require("@/order/data/transforms");
const initializeOrderDetails_1 = require("./initializeOrderDetails");
const mock_config_1 = require("@/order/configs/mock.config");
const event_bus_1 = require("@adobe/event-bus");
const mockTransformOrderDetails = (0, transforms_1.transformOrderDetails)('orderData', {
    // @ts-ignore
    data: { ...mock_config_1.mockOrderDetailsResponse },
});
jest.mock('@/order/api/getOrderDetailsById');
jest.mock('@/order/api/guestOrderByToken');
jest.mock('@adobe/event-bus', () => ({
    events: {
        emit: jest.fn(),
    },
}));
describe('[ORDER-API-HELPERS] - initializeOrderDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    test('called console error if order id is empty', async () => {
        const config = { orderRef: null };
        await (0, initializeOrderDetails_1.initializeOrderDetails)(config);
        await (0, tests_1.waitFor)(() => {
            expect(console.error).toHaveBeenCalled();
        });
    });
    test('called with getOrderDetailsById', async () => {
        event_bus_1.events.emit('order/data', mockTransformOrderDetails);
        api_1.getOrderDetailsById.mockResolvedValue(mockTransformOrderDetails);
        const config = { orderRef: '12345' };
        await (0, initializeOrderDetails_1.initializeOrderDetails)(config);
        const results = await (0, api_1.getOrderDetailsById)('12345', 'orderData');
        await (0, tests_1.waitFor)(() => {
            expect(results).toEqual(mockTransformOrderDetails);
        });
        expect(event_bus_1.events.emit).toHaveBeenCalled();
        expect(event_bus_1.events.emit).toHaveBeenCalledWith('order/data', mockTransformOrderDetails);
    });
    test('called with guestOrderByToken', async () => {
        event_bus_1.events.emit('order/data', mockTransformOrderDetails);
        api_1.guestOrderByToken.mockResolvedValue(mockTransformOrderDetails);
        const config = { orderRef: '12345678910111213141516' };
        await (0, initializeOrderDetails_1.initializeOrderDetails)(config);
        const results = await (0, api_1.guestOrderByToken)(config.orderRef);
        await (0, tests_1.waitFor)(() => {
            expect(results).toEqual(mockTransformOrderDetails);
        });
        expect(event_bus_1.events.emit).toHaveBeenCalled();
        expect(event_bus_1.events.emit).toHaveBeenCalledWith('order/data', mockTransformOrderDetails);
    });
    test('called with orderData', async () => {
        const config = { orderData: mockTransformOrderDetails };
        event_bus_1.events.emit('order/data', mockTransformOrderDetails);
        const result = await (0, initializeOrderDetails_1.initializeOrderDetails)(config);
        expect(event_bus_1.events.emit).toHaveBeenCalled();
        expect(event_bus_1.events.emit).toHaveBeenCalledWith('order/data', mockTransformOrderDetails);
        expect(result).toBeUndefined();
    });
    test('called without orderRef or orderData', async () => {
        api_1.getOrderDetailsById.mockResolvedValue(false);
        event_bus_1.events.emit('order/error', {
            source: 'order',
            type: 'network',
            error: 'The data was not received.',
        });
        const config = { orderRef: '1234567', orderData: null };
        await (0, initializeOrderDetails_1.initializeOrderDetails)(config);
        expect(event_bus_1.events.emit).toHaveBeenCalled();
        expect(event_bus_1.events.emit).toHaveBeenCalledWith('order/error', {
            source: 'order',
            type: 'network',
            error: 'The data was not received.',
        });
    });
});
