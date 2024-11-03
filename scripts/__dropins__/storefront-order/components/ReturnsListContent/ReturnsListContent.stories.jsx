"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultWithProduct = void 0;
const ReturnsListContent_1 = require("./ReturnsListContent");
const mock_config_1 = require("@/order/configs/mock.config");
const i18n_1 = require("@adobe/elsie/i18n");
exports.default = {
    title: 'Components/ReturnsListContent',
    component: ReturnsListContent_1.ReturnsListContent,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: {
        orderReturns: mock_config_1.returnOrderListMock,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        withReturnsListButton: {
            control: 'text',
            description: 'Defines if the button on the bottom of container visible (works only in minified view)',
        },
        minifiedView: {
            description: 'Determines the initial size of the form.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean' },
        },
        withHeader: {
            control: 'boolean',
            description: 'Defines if the container header is visible.',
        },
        withThumbnails: {
            description: 'Show or hide product thumbnails.',
            control: { type: 'boolean' },
        },
        returnsInMinifiedView: {
            control: 'number',
            description: 'Prop controls how many returns visible in minified view (default to 1).',
        },
        routeReturnDetails: {
            control: 'function',
            description: 'Controlling route where customer should be redirected on click at button on the right side of return block (number and token).',
        },
        routeOrderDetails: {
            control: 'function',
            description: 'Controlling where customer should be redirected on click at order number link (number and token).',
        },
        routeProductDetails: {
            description: 'Function that returns the link to the product details route',
        },
        routeTracking: {
            control: 'function',
            description: 'Controlling where customer should be redirected on click at tracking number link (tracking information for return)',
        },
        routeReturnsList: {
            control: 'function',
            description: 'Route for click on button at the bottom of container.',
        },
    },
};
exports.DefaultWithProduct = {
    render: (args) => {
        const minifiedViewKey = args.minifiedView ? 'minifiedView' : 'fullSizeView';
        const translations = (0, i18n_1.useText)({
            viewAllOrdersButton: `Order.Returns.${minifiedViewKey}.returnsList.viewAllOrdersButton`,
            ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
            emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
            minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
            orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
            carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <ReturnsListContent_1.ReturnsListContent {...args} translations={translations}/>
      </div>);
    },
};
