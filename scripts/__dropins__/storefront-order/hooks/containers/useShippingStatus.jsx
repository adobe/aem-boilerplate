"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShippingStatus = void 0;
const event_bus_1 = require("@adobe/event-bus");
const hooks_1 = require("preact/hooks");
const useShippingStatus = ({ orderData }) => {
    const [order, setOrder] = (0, hooks_1.useState)(orderData);
    (0, hooks_1.useEffect)(() => {
        const event = event_bus_1.events.on('order/data', (order) => {
            setOrder(order);
        }, { eager: true });
        return () => {
            event?.off();
        };
    }, []);
    return { order };
};
exports.useShippingStatus = useShippingStatus;
