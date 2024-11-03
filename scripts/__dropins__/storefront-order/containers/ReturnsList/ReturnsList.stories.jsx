"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullSizeViewReturnsPagination = exports.FullSizeViewReturnsImageClick = exports.FullSizeViewReturns = exports.MinifiedViewReturns = exports.FullSizeViewEmpty = exports.MinifiedViewEmpty = void 0;
const ReturnsList_1 = __importDefault(require("@/order/containers/ReturnsList"));
const i18n_1 = require("@adobe/elsie/i18n");
const components_1 = require("@/order/components");
const mock_config_1 = require("@/order/configs/mock.config");
exports.default = {
    title: 'Containers/ReturnsList',
    component: ReturnsList_1.default,
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: { withReturnsListButton: true, minifiedView: true },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        withReturnsListButton: {
            control: 'boolean',
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
exports.MinifiedViewEmpty = {
    render: (args) => (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <ReturnsList_1.default {...args}/>
    </div>),
};
exports.FullSizeViewEmpty = {
    render: (args) => (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
      <ReturnsList_1.default {...args} minifiedView={false}/>
    </div>),
};
exports.MinifiedViewReturns = {
    render: () => {
        const minifiedViewKey = 'minifiedView';
        const translations = (0, i18n_1.useText)({
            viewAllOrdersButton: `Order.Returns.${minifiedViewKey}.returnsList.viewAllOrdersButton`,
            ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
            emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
            minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
            orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
            carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <components_1.ReturnsListContent returnsInMinifiedView={1} minifiedView={true} withThumbnails={true} withHeader={true} withReturnsListButton={true} translations={translations} 
        // @ts-ignore
        orderReturns={mock_config_1.returnOrderListMock}/>
      </div>);
    },
};
exports.FullSizeViewReturns = {
    render: () => {
        const minifiedViewKey = 'fullSizeView';
        const translations = (0, i18n_1.useText)({
            viewAllOrdersButton: `Order.Returns.${minifiedViewKey}.returnsList.viewAllOrdersButton`,
            ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
            emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
            minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
            orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
            carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <components_1.ReturnsListContent withThumbnails={true} translations={translations} 
        // @ts-ignore
        orderReturns={mock_config_1.returnOrderListMock} pageInfo={{ pageSize: 1, totalPages: 1, currentPage: 1 }} selectedPage={1}/>
      </div>);
    },
};
exports.FullSizeViewReturnsImageClick = {
    render: () => {
        const minifiedViewKey = 'fullSizeView';
        const translations = (0, i18n_1.useText)({
            viewAllOrdersButton: `Order.Returns.${minifiedViewKey}.returnsList.viewAllOrdersButton`,
            ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
            emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
            minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
            orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
            carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <components_1.ReturnsListContent withThumbnails={true} translations={translations} 
        // @ts-ignore
        orderReturns={mock_config_1.returnOrderListMock} pageInfo={{ pageSize: 1, totalPages: 1, currentPage: 1 }} selectedPage={1} routeProductDetails={() => 'https://adobe.com'}/>
      </div>);
    },
};
exports.FullSizeViewReturnsPagination = {
    render: () => {
        const minifiedViewKey = 'fullSizeView';
        const translations = (0, i18n_1.useText)({
            viewAllOrdersButton: `Order.Returns.${minifiedViewKey}.returnsList.viewAllOrdersButton`,
            ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
            emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
            minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
            orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
            carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <components_1.ReturnsListContent withThumbnails={true} translations={translations} orderReturns={mock_config_1.returnOrderListMock} pageInfo={{ pageSize: 10, totalPages: 2, currentPage: 1 }} selectedPage={1}/>
      </div>);
    },
};
