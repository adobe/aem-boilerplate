"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrderStatus = void 0;
const event_bus_1 = require("@adobe/event-bus");
const hooks_1 = require("preact/hooks");
const useOrderStatus = ({ orderData }) => {
    const [order, setOrder] = (0, hooks_1.useState)(orderData);
    const [orderStatus, setOrderStatus] = (0, hooks_1.useState)(orderData?.status);
    (0, hooks_1.useEffect)(() => {
        const event = event_bus_1.events.on('order/data', (order) => {
            setOrder(order);
            setOrderStatus(order.status);
        }, { eager: true });
        return () => {
            event?.off();
        };
    }, []);
    return { orderStatus, order };
};
exports.useOrderStatus = useOrderStatus;
