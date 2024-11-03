"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStoreConfig_1 = require("@/order/api/getStoreConfig");
const fetch_error_1 = require("@/order/lib/fetch-error");
const FetchGraphQLModule = __importStar(require("@/order/api/fetch-graphql/fetch-graphql"));
jest.mock('@/order/lib/fetch-error', () => ({
    handleFetchError: jest.fn(),
}));
jest.mock('@/order/data/transforms/transform-store-config', () => ({
    transformStoreConfig: jest.fn().mockReturnValue('mocked transformed data'),
}));
describe('Order/api/getStoreConfig', () => {
    // spy on console.warn
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    // Spy on fetchGraphQl and replace it with the mock function
    let fetchGraphQlSpy;
    beforeEach(() => {
        jest.clearAllMocks();
        fetchGraphQlSpy = jest
            .spyOn(FetchGraphQLModule, 'fetchGraphQl')
            .mockImplementation(jest.fn().mockResolvedValue({
            data: {
                storeConfig: {
                    order_cancellation_enabled: true,
                },
            },
        }));
    });
    it('fetches store config data', async () => {
        const result = await (0, getStoreConfig_1.getStoreConfig)();
        expect(fetchGraphQlSpy).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            method: 'GET',
            cache: 'force-cache',
        }));
        expect(fetchGraphQlSpy).toHaveBeenCalledTimes(1);
        expect(fetchGraphQlSpy.mock.calls[0][0]).toContain('STORE_CONFIG_QUERY');
        expect(fetchGraphQlSpy.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "cache": "force-cache",
        "method": "GET",
      }
    `);
        expect(result).toEqual('mocked transformed data');
    });
    it('handles fetch errors', async () => {
        fetchGraphQlSpy.mockResolvedValue({
            errors: [{ message: 'Error message' }],
        });
        const result = await (0, getStoreConfig_1.getStoreConfig)();
        expect(fetch_error_1.handleFetchError).toHaveBeenCalledWith([
            { message: 'Error message' },
        ]);
        expect(result).toBeUndefined();
    });
});
