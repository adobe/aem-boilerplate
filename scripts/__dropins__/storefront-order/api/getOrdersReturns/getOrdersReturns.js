"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersReturns = void 0;
const network_error_1 = require("@/order/lib/network-error");
const fetch_graphql_1 = require("@/order/api/fetch-graphql");
const fetch_error_1 = require("@/order/lib/fetch-error");
const getOrdersReturns_graphql_1 = require("./graphql/getOrdersReturns.graphql");
const transforms_1 = require("@/order/data/transforms");
const getOrdersReturns = async (isNumber, value) => {
    const variables = isNumber ? { orderNumber: value } : { token: value };
    const query = isNumber ? getOrdersReturns_graphql_1.ORDER_RETURNS_BY_NUMBER : getOrdersReturns_graphql_1.ORDER_RETURNS_BY_TOKEN;
    return await (0, fetch_graphql_1.fetchGraphQl)(query, {
        method: 'GET',
        cache: 'no-cache',
        variables,
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        const { data } = response;
        const ordersByNumber = data
            ?.customer?.orders?.items[0]?.returns;
        const ordersByToken = data
            ?.guestOrderByToken?.returns;
        if (!ordersByNumber && !ordersByToken)
            return [];
        return ((0, transforms_1.transformCustomerOrdersReturn)({
            data: {
                customer: {
                    returns: isNumber ? ordersByNumber : ordersByToken,
                },
            },
        })?.ordersReturn ?? []);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getOrdersReturns = getOrdersReturns;
