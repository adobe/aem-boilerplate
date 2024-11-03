"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialize_1 = require("./initialize");
const event_bus_1 = require("@adobe/event-bus");
jest.mock('../helpers/initializeOrderDetails', () => ({
    initializeOrderDetails: jest.fn().mockResolvedValue(undefined),
}));
describe('[ORDER-API] - Get Order Details', () => {
    const listeners = new Set();
    beforeEach(() => {
        initialize_1.initialize.listeners().forEach((listener) => {
            listeners.add(listener);
        });
        jest.clearAllMocks();
    });
    afterEach(() => {
        listeners.forEach((listener) => {
            listener.off();
        });
        // reset last event
        event_bus_1.events._lastEvent = {};
    });
    test('set config', async () => {
        await expect(initialize_1.initialize.init({})).resolves.toBeUndefined();
        expect(initialize_1.initialize.config.getConfig()).toEqual({});
    });
});
