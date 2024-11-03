"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const OrderProductList_1 = require("@/order/containers/OrderProductList");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Containers/OrderProductList',
    component: OrderProductList_1.OrderProductList,
    parameters: {
        layout: 'centered',
    },
    args: {
        orderData: mock_config_1.storyBookOrderData,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items',
        },
        withHeader: {
            control: { type: 'boolean' },
            description: 'Indicates whether headers should be displayed',
        },
        showConfigurableOptions: {
            description: 'Function responsible for gathering product options',
        },
        routeProductDetails: {
            description: 'Function that returns the link to the product details route',
        },
    },
};
exports.Default = {
    render: (args) => (<div style={{ width: '1000px', margin: '50px auto' }}>
      <OrderProductList_1.OrderProductList {...args}/>
    </div>),
};
