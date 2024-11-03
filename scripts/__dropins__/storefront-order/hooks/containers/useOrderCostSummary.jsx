"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrderCostSummary = void 0;
const api_1 = require("@/order/api");
const setTaxStatus_1 = require("@/order/lib/setTaxStatus");
const event_bus_1 = require("@adobe/event-bus");
const hooks_1 = require("preact/hooks");
const useOrderCostSummary = ({ orderData, }) => {
    const [loading, setLoading] = (0, hooks_1.useState)(true);
    const [order, setOrder] = (0, hooks_1.useState)(orderData);
    const [storeConfig, setStoreConfig] = (0, hooks_1.useState)(null);
    (0, hooks_1.useEffect)(() => {
        (0, api_1.getStoreConfig)()
            .then((response) => {
            if (response) {
                const { shoppingCartDisplayPrice, shoppingOrdersDisplayShipping, shoppingOrdersDisplaySubtotal, ...props } = response;
                setStoreConfig((prev) => ({
                    ...prev,
                    ...props,
                    shoppingCartDisplayPrice: (0, setTaxStatus_1.setTaxStatus)(shoppingCartDisplayPrice),
                    shoppingOrdersDisplayShipping: (0, setTaxStatus_1.setTaxStatus)(shoppingOrdersDisplayShipping),
                    shoppingOrdersDisplaySubtotal: (0, setTaxStatus_1.setTaxStatus)(shoppingOrdersDisplaySubtotal),
                }));
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
    return { loading, storeConfig, order };
};
exports.useOrderCostSummary = useOrderCostSummary;
