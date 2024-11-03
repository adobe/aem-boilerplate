"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderReturns = void 0;
const components_1 = require("@/order/components");
const useOrderReturns_1 = require("@/order/hooks/containers/useOrderReturns");
const lib_1 = require("@adobe/elsie/lib");
const i18n_1 = require("@adobe/elsie/i18n");
const hooks_1 = require("@/order/hooks");
const OrderReturns = ({ slots, className, orderData, withHeader, withThumbnails, routeReturnDetails, routeProductDetails, routeTracking, }) => {
    const { orderReturns } = (0, useOrderReturns_1.useOrderReturns)({ orderData });
    const isMobile = (0, hooks_1.useIsMobile)();
    const minifiedViewKey = 'fullSizeView';
    const translations = (0, i18n_1.useText)({
        minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
        ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
        emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
        orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
        returnNumber: `Order.Returns.${minifiedViewKey}.returnsList.returnNumber`,
        carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
    });
    return (<div className={(0, lib_1.classes)(['order-order-returns', className])}>
      {orderReturns.length ? (<components_1.ReturnsListContent pageInfo={{
                pageSize: 1,
                totalPages: 1,
                currentPage: 1,
            }} minifiedViewKey={minifiedViewKey} slots={slots} isMobile={isMobile} withOrderNumber={false} withReturnNumber={true} orderReturns={orderReturns} translations={translations} withHeader={withHeader} withThumbnails={withThumbnails} minifiedView={false} routeReturnDetails={routeReturnDetails} routeProductDetails={routeProductDetails} routeTracking={routeTracking} loading={false}/>) : null}
    </div>);
};
exports.OrderReturns = OrderReturns;
