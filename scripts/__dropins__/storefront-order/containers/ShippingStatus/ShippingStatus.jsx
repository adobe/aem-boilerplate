"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingStatus = void 0;
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@/order/components");
const hooks_1 = require("@/order/hooks");
const ShippingStatus = ({ slots, className, collapseThreshold, orderData, routeProductDetails, }) => {
    const { order } = (0, hooks_1.useShippingStatus)({ orderData });
    return (<div className={(0, lib_1.classes)(['order-shipping-status', className])}>
      {order ? (<components_1.ShippingStatusCard slots={slots} orderData={order} collapseThreshold={collapseThreshold} routeProductDetails={routeProductDetails}/>) : (<components_1.CardLoader withCard={false}/>)}
    </div>);
};
exports.ShippingStatus = ShippingStatus;
