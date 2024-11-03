"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithoutDiscount = exports.WithDiscount = void 0;
const OrderCostSummary_1 = require("@/order/containers/OrderCostSummary/OrderCostSummary");
const mock_config_1 = require("@/order/configs/mock.config");
const components_1 = require("@/order/components");
const i18n_1 = require("@adobe/elsie/i18n");
const storeConfig = {
    shoppingCartDisplayPrice: {
        taxIncluded: false,
        taxExcluded: false,
    },
    shoppingOrdersDisplayShipping: {
        taxIncluded: false,
        taxExcluded: false,
    },
    shoppingOrdersDisplaySubtotal: {
        taxIncluded: false,
        taxExcluded: false,
    },
    shoppingOrdersDisplayTaxGiftWrapping: '',
    shoppingOrdersDisplayFullSummary: false,
    shoppingOrdersDisplayGrandTotal: false,
    shoppingOrdersDisplayZeroTax: false,
};
const meta = {
    title: 'Containers/OrderCostSummary',
    component: OrderCostSummary_1.OrderCostSummary,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        orderData: mock_config_1.orderCostSummaryMockup,
    },
    argTypes: {
        className: {
            control: 'text',
            description: 'CSS class for additional styling customization of the Addresses.',
        },
        orderData: {
            control: 'object',
            description: 'Order data containing order ID and list of items.',
        },
        withHeader: {
            control: 'object',
            description: 'A boolean configuration which determines if the Component header will be rendered or not.',
        },
    },
};
exports.default = meta;
/**
 * ```ts
 * import { OrderCostSummary } from '@/order/containers/OrderCostSummary';
 * ```
 */
exports.WithDiscount = {
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    render: () => {
        const translations = (0, i18n_1.useText)({
            headerText: 'Order.OrderCostSummary.headerText',
            subtotal: 'Order.OrderCostSummary.subtotal.title',
            shipping: 'Order.OrderCostSummary.shipping.title',
            freeShipping: 'Order.OrderCostSummary.shipping.freeShipping',
            tax: 'Order.OrderCostSummary.tax.title',
            incl: 'Order.OrderCostSummary.tax.incl',
            excl: 'Order.OrderCostSummary.tax.excl',
            discount: 'Order.OrderCostSummary.discount.title',
            discountSubtitle: 'Order.OrderCostSummary.discount.subtitle',
            total: 'Order.OrderCostSummary.total.title',
            accordionTitle: 'Order.OrderCostSummary.tax.accordionTitle',
            accordionTotalTax: 'Order.OrderCostSummary.tax.accordionTotalTax',
            totalExcludingTaxes: 'Order.OrderCostSummary.tax.totalExcludingTaxes',
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <components_1.OrderCostSummaryContent translations={translations} storeConfig={storeConfig} order={mock_config_1.orderCostSummaryMockup}/>
      </div>);
    },
};
exports.WithoutDiscount = {
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    render: () => {
        const translations = (0, i18n_1.useText)({
            headerText: 'Order.OrderCostSummary.headerText',
            subtotal: 'Order.OrderCostSummary.subtotal.title',
            shipping: 'Order.OrderCostSummary.shipping.title',
            freeShipping: 'Order.OrderCostSummary.shipping.freeShipping',
            tax: 'Order.OrderCostSummary.tax.title',
            incl: 'Order.OrderCostSummary.tax.incl',
            excl: 'Order.OrderCostSummary.tax.excl',
            discount: 'Order.OrderCostSummary.discount.title',
            discountSubtitle: 'Order.OrderCostSummary.discount.subtitle',
            total: 'Order.OrderCostSummary.total.title',
            accordionTitle: 'Order.OrderCostSummary.tax.accordionTitle',
            accordionTotalTax: 'Order.OrderCostSummary.tax.accordionTotalTax',
            totalExcludingTaxes: 'Order.OrderCostSummary.tax.totalExcludingTaxes',
        });
        return (<div style={{ maxWidth: '1200px', margin: '50px auto' }}>
        <components_1.OrderCostSummaryContent storeConfig={storeConfig} order={{
                ...mock_config_1.orderCostSummaryMockup,
                discounts: [],
                totalGiftcard: {},
            }} translations={translations}/>
      </div>);
    },
};
