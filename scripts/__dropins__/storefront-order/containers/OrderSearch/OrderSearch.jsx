"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSearch = void 0;
const lib_1 = require("@adobe/elsie/lib");
const components_1 = require("@/order/components");
const hooks_1 = require("@/order/hooks");
const OrderSearch = ({ className, isAuth, renderSignIn, routeCustomerOrder, routeGuestOrder, onError, }) => {
    const { onSubmit, loading, inLineAlert, normalizeFieldsConfig } = (0, hooks_1.useOrderSearch)({
        onError,
        isAuth,
        renderSignIn,
        routeCustomerOrder,
        routeGuestOrder,
    });
    return (<div className={(0, lib_1.classes)(['order-order-search', className])}>
      <components_1.OrderSearchForm onSubmit={onSubmit} loading={loading} inLineAlert={inLineAlert} fieldsConfig={normalizeFieldsConfig}/>
    </div>);
};
exports.OrderSearch = OrderSearch;
