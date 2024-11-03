"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomer = void 0;
const network_error_1 = require("@/order/lib/network-error");
const fetch_graphql_1 = require("@/order/api/fetch-graphql");
const fetch_error_1 = require("@/order/lib/fetch-error");
const getCustomer_graphql_1 = require("./graphql/getCustomer.graphql");
const transforms_1 = require("@/order/data/transforms");
const getCustomer = async () => {
    return await (0, fetch_graphql_1.fetchGraphQl)(getCustomer_graphql_1.GET_CUSTOMER, {
        method: 'GET',
        cache: 'force-cache',
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformCustomer)(response);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getCustomer = getCustomer;
