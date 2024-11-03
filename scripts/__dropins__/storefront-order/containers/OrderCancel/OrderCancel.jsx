"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancel = void 0;
const cancelOrder_1 = require("@/order/api/cancelOrder");
const requestGuestOrderCancel_1 = require("@/order/api/requestGuestOrderCancel");
const useGetStoreConfig_1 = require("@/order/hooks/api/useGetStoreConfig");
const OrderCancelReasonsForm_1 = require("@/order/components/OrderCancelReasonsForm");
const OrderCancel = ({ orderRef }) => {
    const storeConfig = (0, useGetStoreConfig_1.useGetStoreConfig)();
    const orderCancellationReasons = storeConfig?.orderCancellationReasons ?? [];
    let api = cancelOrder_1.cancelOrder;
    if (orderRef.length > 20) {
        api = requestGuestOrderCancel_1.requestGuestOrderCancel;
    }
    const transformCancelReasons = (reasons) => {
        return reasons.map((reason, index) => {
            return {
                text: reason?.description,
                value: index.toString(),
            };
        });
    };
    return (<OrderCancelReasonsForm_1.OrderCancelReasonsForm orderRef={orderRef} cancelOrder={api} cancelReasons={transformCancelReasons(orderCancellationReasons)}/>);
};
exports.OrderCancel = OrderCancel;
