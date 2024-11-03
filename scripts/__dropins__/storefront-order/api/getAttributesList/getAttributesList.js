"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributesList = void 0;
const fetch_graphql_1 = require("../fetch-graphql");
const getAttributesList_graphql_1 = require("./graphql/getAttributesList.graphql");
const network_error_1 = require("@/order/lib/network-error");
const fetch_error_1 = require("@/order/lib/fetch-error");
const transforms_1 = require("@/order/data/transforms");
const getAttributesList = async (entityType) => {
    return await (0, fetch_graphql_1.fetchGraphQl)(getAttributesList_graphql_1.GET_ATTRIBUTES_LIST, {
        method: 'GET',
        cache: 'force-cache',
        variables: { entityType },
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformAttributesForm)(response.data.attributesList.items ?? []);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getAttributesList = getAttributesList;
