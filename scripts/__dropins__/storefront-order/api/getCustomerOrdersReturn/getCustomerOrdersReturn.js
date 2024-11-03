"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerOrdersReturn = void 0;
const network_error_1 = require("@/order/lib/network-error");
const fetch_graphql_1 = require("@/order/api/fetch-graphql");
const fetch_error_1 = require("@/order/lib/fetch-error");
const getCustomerOrdersReturn_graphql_1 = require("./graphql/getCustomerOrdersReturn.graphql");
const transforms_1 = require("@/order/data/transforms");
const getCustomerOrdersReturn = async () => {
    return await (0, fetch_graphql_1.fetchGraphQl)(getCustomerOrdersReturn_graphql_1.GET_CUSTOMER_ORDERS_RETURN, {
        method: 'GET',
        cache: 'force-cache',
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformCustomerOrdersReturns)(response?.data?.customer.returns);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getCustomerOrdersReturn = getCustomerOrdersReturn;
