"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertCase_1 = require("@/order/lib/convertCase");
describe('[Order-LIB] - convertToCamelCase', () => {
    test('should convert snake_case to camelCase', () => {
        expect((0, convertCase_1.convertToCamelCase)('example_key')).toBe('exampleKey');
        expect((0, convertCase_1.convertToCamelCase)('another_example_key')).toBe('anotherExampleKey');
        expect((0, convertCase_1.convertToCamelCase)('singleword')).toBe('singleword');
    });
    test('should return an empty string when given an empty string', () => {
        expect((0, convertCase_1.convertToCamelCase)('')).toBe('');
    });
});
describe('[Order-LIB] - convertToSnakeCase', () => {
    test('should convert camelCase to snake_case', () => {
        expect((0, convertCase_1.convertToSnakeCase)('exampleKey')).toBe('example_key');
        expect((0, convertCase_1.convertToSnakeCase)('anotherExampleKey')).toBe('another_example_key');
        expect((0, convertCase_1.convertToSnakeCase)('singleword')).toBe('singleword');
    });
    test('should return an empty string when given an empty string', () => {
        expect((0, convertCase_1.convertToSnakeCase)('')).toBe('');
    });
});
describe('[Order-LIB] - convertKeysCase', () => {
    test('should convert keys of an object to camelCase', () => {
        const data = {
            example_key: 'value',
            another_example_key: {
                nested_key: 'nestedValue',
            },
        };
        const result = (0, convertCase_1.convertKeysCase)(data, 'camelCase');
        expect(result).toEqual({
            exampleKey: 'value',
            anotherExampleKey: {
                nestedKey: 'nestedValue',
            },
        });
    });
    test('should convert keys of an object to snakeCase', () => {
        const data = {
            exampleKey: 'value',
            anotherExampleKey: {
                nestedKey: 'nestedValue',
            },
        };
        const result = (0, convertCase_1.convertKeysCase)(data, 'snakeCase');
        expect(result).toEqual({
            example_key: 'value',
            another_example_key: {
                nested_key: 'nestedValue',
            },
        });
    });
    test('should handle arrays correctly', () => {
        const data = [
            { example_key: 'value' },
            { another_example_key: 'anotherValue' },
        ];
        const result = (0, convertCase_1.convertKeysCase)(data, 'camelCase');
        expect(result).toEqual([
            { exampleKey: 'value' },
            { anotherExampleKey: 'anotherValue' },
        ]);
    });
    test('should handle primitive types in arrays', () => {
        const data = [1, 'string', true, null];
        const result = (0, convertCase_1.convertKeysCase)(data, 'camelCase');
        expect(result).toEqual([1, 'string', true, null]);
    });
    test('should use dictionary if provided', () => {
        const data = {
            example_key: 'value',
        };
        const dictionary = {
            example_key: 'customKey',
        };
        const result = (0, convertCase_1.convertKeysCase)(data, 'camelCase', dictionary);
        expect(result).toEqual({
            customKey: 'value',
        });
    });
    test('should return original data if not an object or array', () => {
        const data = 'stringValue';
        const result = (0, convertCase_1.convertKeysCase)(data, 'camelCase');
        expect(result).toBe('stringValue');
    });
    test('should handle primitive types correctly in objects', () => {
        const data = {
            numberKey: 123,
            stringKey: 'test',
            booleanKey: true,
            nullKey: null,
        };
        const result = (0, convertCase_1.convertKeysCase)(data, 'snakeCase');
        expect(result).toEqual({
            number_key: 123,
            string_key: 'test',
            boolean_key: true,
            null_key: null,
        });
    });
    test('should return element as is if it is a primitive type in array', () => {
        const data = [1, 'string', true, null, { example_key: 'value' }];
        const result = (0, convertCase_1.convertKeysCase)(data, 'camelCase');
        expect(result).toEqual([1, 'string', true, null, { exampleKey: 'value' }]);
    });
});
