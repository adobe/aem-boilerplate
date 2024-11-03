"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const OrderSearch_1 = require("@/order/containers/OrderSearch");
exports.default = {
    title: 'Containers/OrderSearch',
    component: OrderSearch_1.OrderSearch,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {},
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        isAuth: {
            control: 'boolean',
            description: 'Flag indicating whether the user is authenticated.',
        },
        renderSignIn: {
            description: 'Function responsible for rendering the sign-in form for the user.',
        },
        routeCustomerOrder: {
            description: 'Function that returns a string containing the URL for the authenticated user order route.',
        },
        routeGuestOrder: {
            description: 'Function that returns a string containing the URL for the guest (unauthenticated user) order route.',
        },
        onError: {
            description: 'Function called when an error occurs. Receives an errorInformation object with details about the error.',
        },
    },
};
exports.Template = {
    render: (args) => <OrderSearch_1.OrderSearch {...args}/>,
};
