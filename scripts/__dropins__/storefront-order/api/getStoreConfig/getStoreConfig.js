"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreConfig = void 0;
const api_1 = require("@/order/api");
const transforms_1 = require("@/order/data/transforms");
const fetch_error_1 = require("@/order/lib/fetch-error");
const StoreConfigQuery_1 = require("./graphql/StoreConfigQuery");
const getStoreConfig = async () => {
    return (0, api_1.fetchGraphQl)(StoreConfigQuery_1.STORE_CONFIG_QUERY, {
        method: 'GET',
        cache: 'force-cache',
    }).then(({ errors, data }) => {
        if (errors)
            return (0, fetch_error_1.handleFetchError)(errors);
        return (0, transforms_1.transformStoreConfig)(data.storeConfig);
    });
};
exports.getStoreConfig = getStoreConfig;
