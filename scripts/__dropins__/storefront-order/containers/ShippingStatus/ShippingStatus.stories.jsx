"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const ShippingStatus_1 = require("@/order/containers/ShippingStatus");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Containers/ShippingStatus',
    component: ShippingStatus_1.ShippingStatus,
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
        collapseThreshold: {
            control: 'number',
            description: 'The collapseThreshold parameter sets the minimum number of elements required for images to be displayed in an accordion view.',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items',
        },
        routeProductDetails: {
            description: 'Function that returns the link to the product details route',
        },
    },
};
exports.Default = {
    render: (args) => (<div style={{ maxWidth: '1200px', margin: '20px auto' }}>
      <ShippingStatus_1.ShippingStatus {...args}/>
    </div>),
};
