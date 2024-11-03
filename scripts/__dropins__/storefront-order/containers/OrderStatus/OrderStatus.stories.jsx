"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const OrderStatus_1 = require("@/order/containers/OrderStatus");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Containers/OrderStatus',
    component: OrderStatus_1.OrderStatus,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        orderData: mock_config_1.storyBookOrderData,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        statusTitle: {
            control: 'text',
            description: 'Provides the option to manually input a custom title.',
        },
        status: {
            control: 'text',
            description: 'Displays one of the predefined statuses; by passing a - [Pending, Shipping, Complete, Processing, On Hold, Canceled, Suspected fraud, Payment Review], you can select the corresponding status',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items',
        },
    },
};
exports.Default = {
    render: (args) => <OrderStatus_1.OrderStatus {...args}/>,
};
