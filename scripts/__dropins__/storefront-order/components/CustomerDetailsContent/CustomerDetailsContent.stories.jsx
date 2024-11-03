"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsLoading = exports.Default = void 0;
const CustomerDetailsContent_1 = require("@/order/components/CustomerDetailsContent");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Components/CustomerDetailsContent',
    component: CustomerDetailsContent_1.CustomerDetailsContent,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        order: mock_config_1.storyBookShortOrderData,
        normalizeAddress: mock_config_1.storyBookNormalizeAddress,
        loading: false,
    },
    argTypes: {
        normalizeAddress: {
            control: 'array',
            description: 'Formatted addresses according to the basic data fields from the backend.',
        },
        loading: {
            control: 'boolean',
            description: 'Disables the screen while an asynchronous function is running.',
        },
        title: {
            control: 'text',
            description: 'Provides the option to manually input a custom title.',
        },
        order: {
            control: 'object',
            description: 'Order data containing order ID and list of items.',
        },
        paymentIconsMap: {
            control: 'object',
            description: 'A configuration consisting of key-value pairs. The key is the icon identifier, and the value is the icon itself in SVG format.',
        },
    },
};
exports.Default = {
    render: (args) => <CustomerDetailsContent_1.CustomerDetailsContent {...args}/>,
};
exports.DetailsLoading = {
    args: {
        loading: true,
    },
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    render: (args) => (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <CustomerDetailsContent_1.CustomerDetailsContent {...args}/>
    </div>),
};
