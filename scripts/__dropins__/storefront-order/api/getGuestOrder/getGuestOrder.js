"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuestOrder = void 0;
const fetch_graphql_1 = require("@/order/api/fetch-graphql");
const network_error_1 = require("@/order/lib/network-error");
const fetch_error_1 = require("@/order/lib/fetch-error");
const getGuestOrder_graphql_1 = require("./graphql/getGuestOrder.graphql");
const transforms_1 = require("@/order/data/transforms");
const getGuestOrder = async (form) => {
    return await (0, fetch_graphql_1.fetchGraphQl)(getGuestOrder_graphql_1.GET_GUEST_ORDER, {
        method: 'GET',
        cache: 'no-cache',
        variables: {
            input: form,
        },
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformGuestOrder)(response);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getGuestOrder = getGuestOrder;
