"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsList = void 0;
const components_1 = require("@/order/components");
const hooks_1 = require("@/order/hooks");
const lib_1 = require("@adobe/elsie/lib");
const i18n_1 = require("@adobe/elsie/i18n");
const ReturnsList = ({ slots, withReturnsListButton, className, minifiedView, withHeader, withThumbnails, returnsInMinifiedView, routeReturnDetails, routeOrderDetails, routeTracking, routeReturnsList, routeProductDetails, }) => {
    const { pageInfo, selectedPage, handleSetSelectPage, loading, orderReturns } = (0, hooks_1.useReturnsList)();
    const isMobile = (0, hooks_1.useIsMobile)();
    const minifiedViewKey = minifiedView ? 'minifiedView' : 'fullSizeView';
    const translations = (0, i18n_1.useText)({
        viewAllOrdersButton: `Order.Returns.${minifiedViewKey}.returnsList.viewAllOrdersButton`,
        ariaLabelLink: `Order.Returns.${minifiedViewKey}.returnsList.ariaLabelLink`,
        emptyOrdersListMessage: `Order.Returns.${minifiedViewKey}.returnsList.emptyOrdersListMessage`,
        minifiedViewTitle: `Order.Returns.${minifiedViewKey}.returnsList.minifiedViewTitle`,
        orderNumber: `Order.Returns.${minifiedViewKey}.returnsList.orderNumber`,
        returnNumber: `Order.Returns.${minifiedViewKey}.returnsList.returnNumber`,
        carrier: `Order.Returns.${minifiedViewKey}.returnsList.carrier`,
    });
    return (<div className={(0, lib_1.classes)(['order-returns-list', className])}>
      <components_1.ReturnsListContent minifiedViewKey={minifiedViewKey} withOrderNumber={true} withReturnNumber={true} slots={slots} selectedPage={selectedPage} handleSetSelectPage={handleSetSelectPage} pageInfo={pageInfo} withReturnsListButton={withReturnsListButton} isMobile={isMobile} orderReturns={orderReturns} translations={translations} withHeader={withHeader} returnsInMinifiedView={returnsInMinifiedView} withThumbnails={withThumbnails} minifiedView={minifiedView} routeReturnDetails={routeReturnDetails} routeOrderDetails={routeOrderDetails} routeTracking={routeTracking} routeReturnsList={routeReturnsList} routeProductDetails={routeProductDetails} loading={loading}/>
    </div>);
};
exports.ReturnsList = ReturnsList;
