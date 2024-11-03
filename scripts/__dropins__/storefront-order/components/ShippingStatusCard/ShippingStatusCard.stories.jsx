"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const ShippingStatusCard_1 = require("@/order/components/ShippingStatusCard");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Components/ShippingStatusCard',
    component: ShippingStatusCard_1.ShippingStatusCard,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        orderData: mock_config_1.storyBookOrderData,
        shippingInfoMessage: 'Free one day delivery',
    },
    argTypes: {
        shippingInfoMessage: {
            control: 'text',
            description: 'Text related to delivery information.',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items',
        },
        slots: {
            description: 'Extensible slots for the Order Status container',
        },
        routeProductDetails: {
            description: 'Function that returns the link to the product details route',
        },
    },
};
exports.Default = {
    render: (args) => <ShippingStatusCard_1.ShippingStatusCard {...args}/>,
};
