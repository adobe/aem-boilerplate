"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrderReturns = void 0;
const event_bus_1 = require("@adobe/event-bus");
const hooks_1 = require("preact/hooks");
const useOrderReturns = ({ orderData }) => {
    const [order, setOrder] = (0, hooks_1.useState)(orderData);
    const [orderReturns, setOrderReturns] = (0, hooks_1.useState)([]);
    (0, hooks_1.useEffect)(() => {
        const event = event_bus_1.events.on('order/data', (order) => {
            setOrder(order);
            setOrderReturns(order?.returns);
        }, { eager: true });
        return () => {
            event?.off();
        };
    }, []);
    return { order, orderReturns };
};
exports.useOrderReturns = useOrderReturns;
