"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.fetchGraphQl = exports.setFetchGraphQlHeaders = exports.removeFetchGraphQlHeader = exports.setFetchGraphQlHeader = exports.setEndpoint = void 0;
const fetch_graphql_1 = require("@adobe/fetch-graphql");
_a = new fetch_graphql_1.FetchGraphQL().getMethods(), exports.setEndpoint = _a.setEndpoint, exports.setFetchGraphQlHeader = _a.setFetchGraphQlHeader, exports.removeFetchGraphQlHeader = _a.removeFetchGraphQlHeader, exports.setFetchGraphQlHeaders = _a.setFetchGraphQlHeaders, exports.fetchGraphQl = _a.fetchGraphQl, exports.getConfig = _a.getConfig;
