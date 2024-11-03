"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributesForm = void 0;
const fetch_graphql_1 = require("../fetch-graphql");
const getAttributesForm_graphql_1 = require("./graphql/getAttributesForm.graphql");
const network_error_1 = require("@/order/lib/network-error");
const fetch_error_1 = require("@/order/lib/fetch-error");
const transforms_1 = require("@/order/data/transforms");
const getAttributesForm = async (formCode) => {
    return await (0, fetch_graphql_1.fetchGraphQl)(formCode !== 'shortRequest'
        ? getAttributesForm_graphql_1.GET_ATTRIBUTES_FORM
        : getAttributesForm_graphql_1.GET_ATTRIBUTES_FORM_SHORT, {
        method: 'GET',
        cache: 'force-cache',
        variables: { formCode },
    })
        .then((response) => {
        if (response.errors?.length)
            return (0, fetch_error_1.handleFetchError)(response.errors);
        return (0, transforms_1.transformAttributesForm)(response);
    })
        .catch(network_error_1.handleNetworkError);
};
exports.getAttributesForm = getAttributesForm;
