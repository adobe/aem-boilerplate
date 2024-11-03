"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeOrderDetails = void 0;
const event_bus_1 = require("@adobe/event-bus");
const getOrderDetailsById_1 = require("../getOrderDetailsById");
const guestOrderByToken_1 = require("../guestOrderByToken");
const initializeOrderDetails = async (config) => {
    const orderRef = config?.orderRef ?? '';
    const isToken = orderRef &&
        typeof config?.orderRef === 'string' &&
        config?.orderRef?.length > 20;
    const orderData = config?.orderData ?? null;
    if (orderData) {
        event_bus_1.events.emit('order/data', orderData);
        return;
    }
    if (!orderRef) {
        console.error('Order Token or number not received.');
        return;
    }
    const responseOrderData = isToken
        ? await (0, guestOrderByToken_1.guestOrderByToken)(orderRef)
        : await (0, getOrderDetailsById_1.getOrderDetailsById)(orderRef);
    if (!responseOrderData) {
        event_bus_1.events.emit('order/error', {
            source: 'order',
            type: 'network',
            error: 'The data was not received.',
        });
    }
    else {
        event_bus_1.events.emit('order/data', responseOrderData);
    }
};
exports.initializeOrderDetails = initializeOrderDetails;
