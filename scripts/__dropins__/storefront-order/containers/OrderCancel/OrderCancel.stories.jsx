"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const OrderCancel_1 = require("@/order/containers/OrderCancel");
exports.default = {
    title: 'Containers/OrderCancel',
    component: OrderCancel_1.OrderCancel,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    argTypes: {
        orderRef: {
            description: 'ID of the order to be cancelled',
        },
    },
};
exports.Default = {
    args: {
        orderRef: '1',
    },
};
