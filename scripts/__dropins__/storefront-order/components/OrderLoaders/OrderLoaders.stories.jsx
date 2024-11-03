"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCardLoader = void 0;
const OrderLoaders_1 = require("@/order/components/OrderLoaders");
exports.default = {
    title: 'Components/OrderLoaders',
    component: OrderLoaders_1.CardLoader,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {},
    argTypes: {},
};
const CardLoaderTemplate = {
    render: () => (<div style={{ margin: '30px auto', maxWidth: '1200px' }}>
      <h1>Card Loader</h1>
      <OrderLoaders_1.CardLoader withCard/>
    </div>),
};
exports.DefaultCardLoader = {
    ...CardLoaderTemplate,
    args: {},
};
