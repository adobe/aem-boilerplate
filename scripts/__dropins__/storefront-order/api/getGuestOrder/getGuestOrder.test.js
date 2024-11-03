"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_graphql_1 = require("../fetch-graphql");
const tests_1 = require("@adobe/elsie/lib/tests");
const transforms_1 = require("@/order/data/transforms");
const getGuestOrder_1 = require("./getGuestOrder");
const mock_config_1 = require("@/order/configs/mock.config");
const mockForm = {
    number: '000000009',
    email: 'test@mail.com',
    postcode: '12345',
};
// @ts-ignore
const transFormItems = (0, transforms_1.transformGuestOrder)(mock_config_1.mockOrder);
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
describe('[ORDER-API] - Get guest order', () => {
    test('Get current data guest order', async () => {
        fetch_graphql_1.fetchGraphQl.mockResolvedValue({
            mockOrder: mock_config_1.mockOrder,
            errors: [],
        });
        const response = await (0, getGuestOrder_1.getGuestOrder)(mockForm);
        if (!response)
            return null;
        await (0, tests_1.waitFor)(() => {
            expect(response).toEqual(transFormItems);
        });
    });
    test('Get guest order handles fetch error', async () => {
        fetch_graphql_1.fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        // @ts-ignore
        await expect((0, getGuestOrder_1.getGuestOrder)('testForm')).rejects.toThrow('Error 1 Error 2');
    });
});
