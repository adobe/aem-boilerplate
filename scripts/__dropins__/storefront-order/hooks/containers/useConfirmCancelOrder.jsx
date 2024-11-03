"use strict";
/********************************************************************
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfirmCancelOrder = void 0;
const hooks_1 = require("preact/hooks");
const confirmCancelOrder_1 = require("@/order/api/confirmCancelOrder/confirmCancelOrder");
const i18n_1 = require("@adobe/elsie/i18n");
// The client receives an email with a link that will allow them to confirm the cancellation of their order.
// When the client follows the provided link, they are directed to the cancellation confirmation page with two query parameters.
// If these parameters are present, we make a request to confirm the cancellation. This request returns a response that we display to the user.
const useConfirmCancelOrder = ({ enableOrderCancellation, }) => {
    const translations = (0, i18n_1.useText)({
        orderCancelled: 'Order.OrderStatusContent.orderCanceled.message',
    });
    const [confirmOrderCancellation, setConfirmOrderCancellation] = (0, hooks_1.useState)({
        text: '',
        status: undefined,
    });
    (0, hooks_1.useEffect)(() => {
        if (!enableOrderCancellation)
            return;
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get('orderId');
        const confirmationKey = params.get('confirmationKey');
        if (orderId && confirmationKey) {
            (0, confirmCancelOrder_1.confirmCancelOrder)(atob(orderId), confirmationKey)
                .then(() => {
                setConfirmOrderCancellation({
                    text: translations.orderCancelled,
                    status: 'success',
                });
            })
                .catch((error) => {
                setConfirmOrderCancellation({
                    text: error.message,
                    status: 'warning',
                });
            });
        }
    }, [enableOrderCancellation, translations.orderCancelled]);
    return { confirmOrderCancellation };
};
exports.useConfirmCancelOrder = useConfirmCancelOrder;
