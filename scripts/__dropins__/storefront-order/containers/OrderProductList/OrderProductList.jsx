"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductList = void 0;
const components_1 = require("@/order/components");
const hooks_1 = require("@/order/hooks");
const lib_1 = require("@adobe/elsie/lib");
const OrderProductList = ({ className, orderData, withHeader, showConfigurableOptions, routeProductDetails, }) => {
    const { loading, taxConfig, order } = (0, hooks_1.useOrderProductList)({
        orderData,
    });
    return (<div className={(0, lib_1.classes)(['order-order-product-list', className])}>
      <components_1.OrderProductListContent loading={loading} taxConfig={taxConfig} order={order} withHeader={withHeader} showConfigurableOptions={showConfigurableOptions} routeProductDetails={routeProductDetails}/>
    </div>);
};
exports.OrderProductList = OrderProductList;
