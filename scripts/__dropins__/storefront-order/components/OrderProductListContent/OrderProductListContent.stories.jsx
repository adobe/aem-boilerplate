"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const OrderProductListContent_1 = require("@/order/components/OrderProductListContent");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Components/OrderProductListContent',
    component: OrderProductListContent_1.OrderProductListContent,
    parameters: {
        layout: 'centered',
    },
    args: {
        order: { ...mock_config_1.transformMockOrderOutput, ...mock_config_1.orderMockOrderProductItemsList },
        loading: false,
        taxConfig: { taxExcluded: true, taxIncluded: true },
    },
    argTypes: {
        order: {
            control: 'object',
            description: 'Order data containing order ID and list of items',
        },
        taxConfig: {
            control: 'object',
            description: 'Configuration tax (taxExcluded, taxIncluded)',
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
      <OrderProductListContent_1.OrderProductListContent {...args}/>
    </div>),
};
