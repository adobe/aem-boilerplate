"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDetails = void 0;
const lib_1 = require("@adobe/elsie/lib");
const hooks_1 = require("@/order/hooks");
const components_1 = require("@/order/components");
const CustomerDetails = ({ paymentIconsMap, orderData, title, className, }) => {
    const { order, normalizeAddress, loading } = (0, hooks_1.useCustomerDetails)({
        orderData,
    });
    return (<div className={(0, lib_1.classes)(['order-customer-details', className])}>
      <components_1.CustomerDetailsContent loading={loading} order={order} title={title} paymentIconsMap={paymentIconsMap} normalizeAddress={normalizeAddress}/>
    </div>);
};
exports.CustomerDetails = CustomerDetails;
