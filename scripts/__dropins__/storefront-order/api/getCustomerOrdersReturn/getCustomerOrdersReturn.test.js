"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/order/api");
const tests_1 = require("@adobe/elsie/lib/tests");
const transforms_1 = require("@/order/data/transforms");
const mock_config_1 = require("@/order/configs/mock.config");
// @ts-ignore
const mockCustomer = (0, transforms_1.transformCustomerOrdersReturns)(mock_config_1.returnOrderListMockResponse);
const mockErrors = [{ message: 'Error 1' }, { message: 'Error 2' }];
jest.mock('@adobe/fetch-graphql', () => {
    return {
        FetchGraphQL: jest.fn().mockImplementation(() => ({
            getMethods: jest.fn(() => ({
                fetchGraphQl: jest.fn(),
            })),
        })),
    };
});
const testGetCustomerData = async () => {
    api_1.fetchGraphQl.mockResolvedValue({
        returnOrderListMockResponse: mock_config_1.returnOrderListMockResponse,
        errors: [],
    });
    return await (0, api_1.getCustomerOrdersReturn)();
};
describe('[AUTH-API] - Get Customer', () => {
    test('returns user data', async () => {
        const response = await testGetCustomerData();
        await (0, tests_1.waitFor)(() => {
            expect(response).toEqual(mockCustomer);
        });
    });
    test('Without token Throw error', async () => {
        api_1.fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        await expect((0, api_1.getCustomerOrdersReturn)()).rejects.toThrow('Error 1 Error 2');
    });
    test('called authHeaderConfig tokenPrefix is null', async () => {
        const response = await testGetCustomerData();
        await (0, tests_1.waitFor)(() => {
            expect(response).toEqual(mockCustomer);
        });
    });
});
