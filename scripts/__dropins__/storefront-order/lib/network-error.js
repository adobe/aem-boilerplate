"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNetworkError = void 0;
const event_bus_1 = require("@adobe/event-bus");
/**
 * A function which can be attached to fetchGraphQL to handle thrown errors in
 * a generic way.
 */
const handleNetworkError = (error) => {
    const isAbortError = error instanceof DOMException && error.name === 'AbortError';
    if (!isAbortError) {
        event_bus_1.events.emit('order/error', {
            source: 'auth',
            type: 'network',
            error: error.message,
        });
    }
    throw error;
};
exports.handleNetworkError = handleNetworkError;
