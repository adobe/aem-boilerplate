"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderDetailsById = void 0;
const api_1 = require("@/order/api");
const graphql_1 = require("./graphql");
const fetch_error_1 = require("@/order/lib/fetch-error");
const network_error_1 = require("@/order/lib/network-error");
const transforms_1 = require("@/order/data/transforms");
const getOrderDetailsById = async (orderId, queryType) => {
    return await (0, api_1.fetchGraphQl)(graphql_1.ORDER_BY_NUMBER, {
        method: 'GET',
        cache: 'force-cache',
        variables: { orderNumber: orderId },
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformOrderDetails)(queryType ?? 'orderData', response);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getOrderDetailsById = getOrderDetailsById;
