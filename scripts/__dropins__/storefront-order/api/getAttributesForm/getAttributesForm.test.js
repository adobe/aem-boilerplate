"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAttributesForm_1 = require("@/order/api/getAttributesForm");
const fetch_graphql_1 = require("../fetch-graphql");
const tests_1 = require("@adobe/elsie/lib/tests");
const transforms_1 = require("@/order/data/transforms");
const items = [
    {
        code: 'firstname',
        default_value: null,
        entity_type: 'CUSTOMER',
        frontend_class: null,
        frontend_input: 'TEXT',
        is_required: true,
        is_unique: false,
        label: 'First Name',
        options: [],
        sort_order: '10',
        multiline_count: 1,
    },
    {
        code: 'lastname',
        default_value: null,
        entity_type: 'CUSTOMER',
        frontend_class: null,
        frontend_input: 'TEXT',
        is_required: true,
        is_unique: false,
        label: 'Last Name',
        options: [],
        sort_order: '20',
        multiline_count: 1,
    },
    {
        code: 'email',
        default_value: null,
        entity_type: 'CUSTOMER',
        frontend_class: null,
        frontend_input: 'TEXT',
        is_required: true,
        is_unique: false,
        label: 'Email',
        options: [],
        sort_order: '30',
        multiline_count: 1,
    },
];
const mockItems = (0, transforms_1.transformAttributesForm)({
    data: {
        attributesForm: {
            items,
        },
    },
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
describe('[Account-API] - Get Attributes Form', () => {
    test('AttributesForm successfully fetches data', async () => {
        fetch_graphql_1.fetchGraphQl.mockResolvedValue({
            data: {
                attributesForm: {
                    items,
                    errors: [],
                },
            },
            errors: [],
        });
        const response = await (0, getAttributesForm_1.getAttributesForm)('testForm');
        if (!response)
            return null;
        await (0, tests_1.waitFor)(() => {
            expect(response).toEqual(mockItems);
        });
    });
    test('AttributesForm handles fetch error', async () => {
        fetch_graphql_1.fetchGraphQl.mockResolvedValue({
            data: {},
            errors: mockErrors,
        });
        await expect((0, getAttributesForm_1.getAttributesForm)('shortRequest')).rejects.toThrow('Error 1 Error 2');
    });
});
