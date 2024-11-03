"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@/order/api");
const tests_1 = require("@adobe/elsie/lib/tests");
const transforms_1 = require("@/order/data/transforms");
const mock_config_1 = require("@/order/configs/mock.config");
const mockTransformOrderDetails = (0, transforms_1.transformOrderDetails)('orderData', {
    // @ts-ignore
    data: { ...mock_config_1.mockOrderDetailsResponse },
});
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
describe('[ORDER-API] - Get order details by id', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    test('called Throw error', async () => {
        api_1.fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        await expect((0, api_1.getOrderDetailsById)('00000001')).rejects.toThrow('Error 1 Error 2');
    });
    test('returns order transform data', async () => {
        api_1.fetchGraphQl.mockResolvedValue({
            data: mock_config_1.mockOrderDetailsResponse,
            errors: [],
        });
        const response = await (0, api_1.getOrderDetailsById)('00000001');
        await (0, tests_1.waitFor)(() => {
            expect(response).toEqual(mockTransformOrderDetails);
        });
    });
});
