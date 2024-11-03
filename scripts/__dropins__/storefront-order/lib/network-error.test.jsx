"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_bus_1 = require("@adobe/event-bus");
const network_error_1 = require("./network-error");
jest.mock('@adobe/event-bus', () => ({
    events: {
        emit: jest.fn(),
    },
}));
describe('handleNetworkError', () => {
    test('should ignore AbortErrors', () => {
        const error = new DOMException('AbortError', 'AbortError');
        expect(() => (0, network_error_1.handleNetworkError)(error)).toThrow(error);
        expect(event_bus_1.events.emit).not.toHaveBeenCalled();
    });
    test('should emit an event for other errors', () => {
        const error = new DOMException('NetworkError', 'NetworkError');
        expect(() => (0, network_error_1.handleNetworkError)(error)).toThrow(error);
        expect(event_bus_1.events.emit).toHaveBeenCalledWith('order/error', {
            source: 'auth',
            type: 'network',
            error: 'NetworkError',
        });
    });
});
