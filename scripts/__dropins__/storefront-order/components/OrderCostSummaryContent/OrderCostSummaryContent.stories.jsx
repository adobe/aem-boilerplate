"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithoutDiscount = exports.WithDiscount = void 0;
const OrderCostSummaryContent_1 = require("@/order/components/OrderCostSummaryContent/OrderCostSummaryContent");
const mock_config_1 = require("@/order/configs/mock.config");
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
    title: 'Components/OrderCostSummaryContent',
    component: OrderCostSummaryContent_1.OrderCostSummaryContent,
    parameters: {
        layout: 'centered', // centered | fullscreen
    },
    args: {
        order: mock_config_1.orderCostSummaryMockup,
        storeConfig,
    },
    argTypes: {
        order: {
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
    args: { storeConfig },
    render: (args) => {
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
        <OrderCostSummaryContent_1.OrderCostSummaryContent {...args} translations={translations}/>
      </div>);
    },
};
exports.WithoutDiscount = {
    parameters: {
        layout: 'fullscreen', // centered | fullscreen
    },
    args: { storeConfig },
    render: (args) => {
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
        <OrderCostSummaryContent_1.OrderCostSummaryContent {...args} order={{
                ...mock_config_1.orderCostSummaryMockup,
                discounts: [],
                totalGiftcard: {},
            }} translations={translations}/>
      </div>);
    },
};
