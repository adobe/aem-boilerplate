"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const OrderActions_1 = require("@/order/components/OrderActions");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Components/OrderActions',
    component: OrderActions_1.OrderActions,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {
        orderData: mock_config_1.storyBookOrderData,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items',
        },
        slots: {
            description: 'Extensible slots for the OrderActions component',
        },
    },
};
exports.Default = {
    render: (args) => (<div style={{ maxWidth: '1200px', margin: '200px auto' }}>
      <OrderActions_1.OrderActions {...args}/>
    </div>),
};
