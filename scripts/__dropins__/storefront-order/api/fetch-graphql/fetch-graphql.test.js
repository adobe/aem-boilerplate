"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_graphql_1 = require("./fetch-graphql");
describe('fetch-graphql', () => {
    test('should return a methods', async () => {
        expect(typeof fetch_graphql_1.setEndpoint).toBe('function');
        expect(typeof fetch_graphql_1.setFetchGraphQlHeader).toBe('function');
        expect(typeof fetch_graphql_1.removeFetchGraphQlHeader).toBe('function');
        expect(typeof fetch_graphql_1.setFetchGraphQlHeaders).toBe('function');
        expect(typeof fetch_graphql_1.fetchGraphQl).toBe('function');
        expect(typeof fetch_graphql_1.getConfig).toBe('function');
    });
});
