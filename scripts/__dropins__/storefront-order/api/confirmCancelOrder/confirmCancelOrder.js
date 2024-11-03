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
exports.confirmCancelOrder = void 0;
const ConfirmCancelOrder_1 = require("@/order/api/confirmCancelOrder/graphql/ConfirmCancelOrder");
const event_bus_1 = require("@adobe/event-bus");
const api_1 = require("@/order/api");
const fetch_error_1 = require("@/order/lib/fetch-error");
const transforms_1 = require("@/order/data/transforms");
const confirmCancelOrder = async (orderId, confirmationKey) => {
    return (0, api_1.fetchGraphQl)(ConfirmCancelOrder_1.CONFIRM_CANCEL_ORDER_MUTATION, {
        variables: {
            orderId,
            confirmationKey,
        },
    }).then(async ({ errors, data }) => {
        const _errors = [
            ...(data?.confirmCancelOrder?.errorV2
                ? [data?.confirmCancelOrder?.errorV2]
                : []),
            ...(errors ?? []),
        ];
        let payload = null;
        if (data?.confirmCancelOrder?.order) {
            payload = (0, transforms_1.transformOrderData)(data?.confirmCancelOrder?.order);
            event_bus_1.events.emit('order/data', payload);
        }
        if (_errors.length > 0) {
            return (0, fetch_error_1.handleFetchError)(_errors);
        }
        return payload;
    });
};
exports.confirmCancelOrder = confirmCancelOrder;
