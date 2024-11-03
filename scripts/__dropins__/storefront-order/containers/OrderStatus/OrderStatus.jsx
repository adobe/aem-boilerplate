"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
const components_1 = require("@/order/components");
const hooks_1 = require("@/order/hooks");
const lib_1 = require("@adobe/elsie/lib");
const useConfirmCancelOrder_1 = require("@/order/hooks/containers/useConfirmCancelOrder");
const components_2 = require("@adobe/elsie/components");
const compat_1 = require("preact/compat");
const i18n_1 = require("@adobe/elsie/i18n");
const useGetStoreConfig_1 = require("@/order/hooks/api/useGetStoreConfig");
const OrderStatus = ({ slots, orderData, className, statusTitle, status, }) => {
    const { orderStatus, order } = (0, hooks_1.useOrderStatus)({ orderData });
    const [isOrderCancellationDismissed, setIsOrderCancellationDismissed] = (0, compat_1.useState)(false);
    const onDismiss = () => {
        setIsOrderCancellationDismissed(true);
        const url = new URL(window.location.href);
        const orderId = url.searchParams.get('orderId');
        const confirmationKey = url.searchParams.get('confirmationKey');
        if (orderId && confirmationKey) {
            url.searchParams.delete('orderId');
            url.searchParams.delete('confirmationKey');
            window.history.replaceState({}, document.title, url.toString());
        }
    };
    const translations = (0, i18n_1.useText)({
        cancelOrder: 'Order.OrderStatusContent.actions.cancel',
    });
    const storeConfig = (0, useGetStoreConfig_1.useGetStoreConfig)();
    const { confirmOrderCancellation } = (0, useConfirmCancelOrder_1.useConfirmCancelOrder)({
        enableOrderCancellation: storeConfig?.orderCancellationEnabled,
    });
    return (<div className={(0, lib_1.classes)(['order-order-status', className])}>
      {!isOrderCancellationDismissed &&
            confirmOrderCancellation?.status !== undefined && (<components_2.InLineAlert heading={translations.cancelOrder} onDismiss={onDismiss} description={confirmOrderCancellation.text} type={confirmOrderCancellation.status}/>)}
      {order ? (<components_1.OrderStatusContent title={statusTitle} status={status || orderStatus} slots={slots} orderData={order}/>) : (<components_1.CardLoader withCard={false}/>)}
    </div>);
};
exports.OrderStatus = OrderStatus;
