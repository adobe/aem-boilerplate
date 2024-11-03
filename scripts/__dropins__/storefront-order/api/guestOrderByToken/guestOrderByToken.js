"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestOrderByToken = void 0;
const api_1 = require("@/order/api");
const fetch_error_1 = require("@/order/lib/fetch-error");
const network_error_1 = require("@/order/lib/network-error");
const guestOrderByToken_graphql_1 = require("./graphql/guestOrderByToken.graphql");
const transforms_1 = require("@/order/data/transforms");
const guestOrderByToken = async (token) => {
    return await (0, api_1.fetchGraphQl)(guestOrderByToken_graphql_1.ORDER_BY_TOKEN, {
        method: 'GET',
        cache: 'no-cache',
        variables: { token },
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformGuestOrderByToken)(response);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.guestOrderByToken = guestOrderByToken;
