"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomerDetails = void 0;
const api_1 = require("@/order/api");
const defaultAttributePreset_config_1 = require("@/order/configs/defaultAttributePreset.config");
const convertCase_1 = require("@/order/lib/convertCase");
const event_bus_1 = require("@adobe/event-bus");
const hooks_1 = require("preact/hooks");
const useCustomerDetails = ({ orderData }) => {
    const [loading, setLoading] = (0, hooks_1.useState)(true);
    const [order, setOrder] = (0, hooks_1.useState)(orderData);
    const [keysSortOrder, setKeysSortOrder] = (0, hooks_1.useState)([]);
    (0, hooks_1.useEffect)(() => {
        const event = event_bus_1.events.on('order/data', (order) => {
            setOrder(order);
        }, { eager: true });
        return () => {
            event?.off();
        };
    }, []);
    (0, hooks_1.useEffect)(() => {
        (0, api_1.getAttributesForm)('shortRequest')
            .then((attributesFormResponse) => {
            if (attributesFormResponse) {
                const result = attributesFormResponse.map(({ name, orderNumber, label }) => ({
                    name: (0, convertCase_1.convertToCamelCase)(name),
                    orderNumber,
                    label: !defaultAttributePreset_config_1.defaultAttributePreset.includes(name)
                        ? label
                        : null,
                }));
                setKeysSortOrder(result);
            }
        })
            .finally(() => {
            setLoading(false);
        });
    }, []);
    const getNormalizeAddress = (0, hooks_1.useCallback)((type) => {
        if (!keysSortOrder.length || !order || !order[type])
            return [];
        const address = Object.fromEntries(Object.entries(order[type]).map(([key, value]) => [
            key.toLowerCase(),
            value,
        ]));
        // @ts-ignore
        return keysSortOrder
            .filter(({ name }) => address[name.toLowerCase()])
            .map((item) => {
            return {
                name: item.name,
                orderNumber: item.orderNumber,
                value: address[item.name.toLowerCase()],
                label: item.label,
            };
        });
    }, [keysSortOrder, order]);
    const normalizeAddress = (0, hooks_1.useMemo)(() => ({
        billingAddress: getNormalizeAddress('billingAddress'),
        shippingAddress: getNormalizeAddress('shippingAddress'),
    }), [getNormalizeAddress]);
    return { order, normalizeAddress, loading };
};
exports.useCustomerDetails = useCustomerDetails;
