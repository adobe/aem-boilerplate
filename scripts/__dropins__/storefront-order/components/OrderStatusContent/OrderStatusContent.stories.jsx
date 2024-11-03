"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const OrderStatusContent_1 = require("@/order/components/OrderStatusContent");
exports.default = {
    title: 'Components/OrderStatusContent',
    component: OrderStatusContent_1.OrderStatusContent,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        title: 'Pending',
        status: 'Pending',
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Text related to Title information.',
        },
        status: {
            control: 'text',
            description: 'Displays one of the predefined statuses; by passing a - [Pending, Shipping, Complete, Processing, On Hold, Canceled, Suspected fraud, Payment Review], you can select the corresponding status',
        },
        children: {
            control: 'text',
            description: 'Content to be rendered inside the component. This could be any valid React node.',
        },
    },
};
exports.Default = {
    render: (args) => <OrderStatusContent_1.OrderStatusContent {...args}/>,
};
