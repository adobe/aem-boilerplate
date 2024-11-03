"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const transform_attributes_form_1 = require("./transform-attributes-form");
const getMockResponse = (items = []) => {
    return {
        data: {
            attributesForm: items.length ? items : null,
        },
    };
};
describe('[Account-Transform] - transformAttributesForm', () => {
    test('returns errors if present', () => {
        expect((0, transform_attributes_form_1.transformAttributesForm)(getMockResponse())).toEqual([]);
    });
    test('return correct data after transform', () => {
        expect((0, transform_attributes_form_1.transformAttributesForm)({
            data: {
                attributesForm: {
                    items: [
                        {
                            frontend_input: 'TEXT',
                            required: true,
                            label: 'First Name',
                            sort_order: 20,
                            name: 'country_id',
                            id: 'country_id',
                            code: 'country_id',
                        },
                        {
                            frontend_input: 'TEXT',
                            required: true,
                            label: 'First Name',
                            sort_order: 20,
                            name: 'firstname',
                            id: 'firstname',
                            code: 'firstname',
                        },
                    ],
                },
            },
        })).toEqual([
            {
                fieldType: 'TEXT',
                required: true,
                label: 'First Name',
                orderNumber: 20,
                name: 'country_code',
                id: 'country_code',
                code: 'country_code',
                customUpperCode: 'countryCode',
            },
            {
                fieldType: 'TEXT',
                required: true,
                label: 'First Name',
                orderNumber: 20,
                name: 'firstname',
                id: 'firstname',
                code: 'firstname',
                customUpperCode: 'firstname',
            },
        ]);
    });
});
describe('cloneArrayIfExists', () => {
    test('returns an empty array if the input array is empty', () => {
        const result = (0, transform_attributes_form_1.cloneArrayIfExists)([]);
        expect(result).toEqual([]);
    });
    test('returns an empty array if multilineCount is less than 2', () => {
        const fields = [
            {
                frontend_input: 'MULTILINE',
                multiline_count: 1,
                code: 'code1',
                name: 'name1',
                id: 'id1',
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 1,
                code: 'code2',
                name: 'name2',
                id: 'id2',
            },
        ];
        const result = (0, transform_attributes_form_1.cloneArrayIfExists)(fields);
        expect(result).toEqual([]);
    });
    test('clones elements if fieldType is MULTILINE and multilineCount is greater than or equal to 2', () => {
        const fields = [
            {
                frontend_input: 'MULTILINE',
                multiline_count: 3,
                code: 'code1',
                name: 'name1',
                id: 'id1',
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 2,
                code: 'code2',
                name: 'name2',
                id: 'id2',
            },
        ];
        const result = (0, transform_attributes_form_1.cloneArrayIfExists)(fields);
        expect(result).toEqual([
            {
                frontend_input: 'MULTILINE',
                multiline_count: 3,
                code: 'code1_2',
                name: 'code1_2',
                id: 'code1_2',
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 3,
                code: 'code1_3',
                name: 'code1_3',
                id: 'code1_3',
            },
            {
                frontend_input: 'MULTILINE',
                multiline_count: 2,
                code: 'code2_2',
                name: 'code2_2',
                id: 'code2_2',
            },
        ]);
    });
});
