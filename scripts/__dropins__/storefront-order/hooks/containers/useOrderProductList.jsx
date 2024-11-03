"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrderProductList = void 0;
const api_1 = require("@/order/api");
const setTaxStatus_1 = require("@/order/lib/setTaxStatus");
const event_bus_1 = require("@adobe/event-bus");
const hooks_1 = require("preact/hooks");
const useOrderProductList = ({ orderData, }) => {
    const [loading, setLoading] = (0, hooks_1.useState)(true);
    const [order, setOrder] = (0, hooks_1.useState)(orderData);
    const [taxConfig, setTaxConfig] = (0, hooks_1.useState)({
        taxIncluded: false,
        taxExcluded: false,
    });
    (0, hooks_1.useEffect)(() => {
        (0, api_1.getStoreConfig)()
            .then((response) => {
            if (response) {
                setTaxConfig((0, setTaxStatus_1.setTaxStatus)(response?.shoppingCartDisplayPrice));
            }
        })
            .finally(() => {
            setLoading(false);
        });
    }, []);
    (0, hooks_1.useEffect)(() => {
        const event = event_bus_1.events.on('order/data', (order) => {
            setOrder(order);
        }, { eager: true });
        return () => {
            event?.off();
        };
    }, []);
    return { loading, taxConfig, order };
};
exports.useOrderProductList = useOrderProductList;
