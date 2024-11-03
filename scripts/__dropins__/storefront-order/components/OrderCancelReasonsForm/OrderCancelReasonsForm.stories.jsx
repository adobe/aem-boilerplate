"use strict";
/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
exports.Default = void 0;
const components_1 = require("@/order/components");
const meta = {
    title: 'Components/OrderCancelReasonsForm',
    component: components_1.OrderCancelReasonsForm,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    argTypes: {
        pickerProps: {
            description: 'Picker to show and select cancel order reason.',
        },
        submitButtonProps: {
            description: 'Button to submit cancel order',
        },
        cancelReasons: {
            description: ' An array of cancellation reasons',
        },
        cancelOrder: {
            description: 'A function to be executed once an order cancellation is requested',
        },
        orderId: {
            description: 'ID of the order to be cancelled',
        },
    },
};
exports.default = meta;
/**
 * ```ts
 * import { OrderCancelModal } from '@/order/components/OrderCancelModal;
 * ```
 */
exports.Default = {
    args: {
        pickerProps: {
            name: 'cancellationReasons',
            variant: 'primary',
        },
        submitButtonProps: {
            variant: 'primary',
        },
        cancelReasons: [
            { text: 'lorem', value: '1' },
            { text: 'ipsum', value: '2' },
        ],
        cancelOrder: () => {
            return Promise.resolve();
        },
        orderId: '1',
    },
};
