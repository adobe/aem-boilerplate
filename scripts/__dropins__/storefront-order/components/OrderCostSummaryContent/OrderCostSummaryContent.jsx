"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCostSummaryContent = void 0;
const components_1 = require("@adobe/elsie/components");
const lib_1 = require("@adobe/elsie/lib");
const OrderLoaders_1 = require("../OrderLoaders");
require("@/order/components/OrderCostSummaryContent/OrderCostSummaryContent.css");
const Blocks_1 = require("./Blocks");
const OrderCostSummaryContent = ({ translations, loading, storeConfig, order, withHeader = true, }) => {
    if (loading || !order)
        return <OrderLoaders_1.OrderSummarySkeleton />;
    const totalGiftcardValue = order?.totalGiftcard?.value ?? 0;
    const totalGiftcardCurrency = order.totalGiftcard?.currency ?? '';
    const subTotalValue = order.subtotal?.value ?? 0;
    const totalShipping = order.totalShipping?.value ?? 0;
    const renderTaxAccordion = !!order?.taxes?.length && storeConfig?.shoppingOrdersDisplayFullSummary;
    const totalAccordionTaxValue = renderTaxAccordion
        ? order?.taxes?.reduce((value, acc) => {
            return +acc?.amount?.value + value;
        }, 0)
        : 0;
    return (<components_1.Card variant="secondary" className={(0, lib_1.classes)(['order-cost-summary-content'])}>
      {withHeader ? <components_1.Header title={translations.headerText}/> : null}

      <div className="order-cost-summary-content__wrapper">
        <Blocks_1.Subtotal translations={translations} order={order} subTotalValue={subTotalValue} shoppingOrdersDisplaySubtotal={storeConfig?.shoppingOrdersDisplaySubtotal}/>
        <Blocks_1.Shipping translations={translations} order={order} totalShipping={totalShipping} shoppingOrdersDisplayShipping={storeConfig?.shoppingOrdersDisplayShipping}/>
        <Blocks_1.Discounts translations={translations} order={order} totalGiftcardValue={totalGiftcardValue} totalGiftcardCurrency={totalGiftcardCurrency}/>
        <Blocks_1.Coupons order={order}/>
        <Blocks_1.AccordionTax order={order} translations={translations} renderTaxAccordion={renderTaxAccordion} totalAccordionTaxValue={totalAccordionTaxValue}/>
        <Blocks_1.Total translations={translations} shoppingOrdersDisplaySubtotal={storeConfig?.shoppingOrdersDisplaySubtotal} order={order}/>
      </div>
    </components_1.Card>);
};
exports.OrderCostSummaryContent = OrderCostSummaryContent;
