"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCostSummary = void 0;
const lib_1 = require("@adobe/elsie/lib");
const hooks_1 = require("@/order/hooks");
const components_1 = require("@/order/components");
const i18n_1 = require("@adobe/elsie/i18n");
const OrderCostSummary = ({ withHeader, orderData, children, className, ...props }) => {
    const { loading, storeConfig, order } = (0, hooks_1.useOrderCostSummary)({ orderData });
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
    return (<div {...props} className={(0, lib_1.classes)(['order-cost-summary', className])}>
      <components_1.OrderCostSummaryContent order={order} withHeader={withHeader} loading={loading} storeConfig={storeConfig} translations={translations}/>
    </div>);
};
exports.OrderCostSummary = OrderCostSummary;
