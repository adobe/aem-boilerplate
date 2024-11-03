"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithAddress = exports.WithoutAddress = void 0;
const CustomerDetails_1 = require("@/order/containers/CustomerDetails");
const mock_config_1 = require("@/order/configs/mock.config");
const components_1 = require("@/order/components");
exports.default = {
    title: 'Containers/CustomerDetails',
    component: CustomerDetails_1.CustomerDetails,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        orderData: mock_config_1.storyBookShortOrderData,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        title: {
            control: 'text',
            description: 'Provides the option to manually input a custom title.',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items.',
        },
        paymentIconsMap: {
            control: 'object',
            description: 'A configuration consisting of key-value pairs. The key is the icon identifier, and the value is the icon itself in SVG format.',
        },
    },
};
exports.WithoutAddress = {
    render: (args) => <CustomerDetails_1.CustomerDetails {...args}/>,
};
exports.WithAddress = {
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    render: () => (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <components_1.CustomerDetailsContent order={mock_config_1.storyBookShortOrderData} normalizeAddress={mock_config_1.storyBookNormalizeAddress} loading={false} paymentIconsMap={{}}/>
    </div>),
};
