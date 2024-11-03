"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const mock_config_1 = require("@/order/configs/mock.config");
const transform_order_details_1 = require("./transform-order-details");
describe('[ORDER-Transforms] - transformOrderDetails', () => {
    test('return null if response empty', () => {
        expect((0, transform_order_details_1.transformOrderDetails)('orderData', {
            data: null,
        })).toBeNull();
    });
    test('return null if queryType is empty', () => {
        expect((0, transform_order_details_1.transformOrderDetails)('empty', mock_config_1.transformMockOrderInput)).toBeNull();
    });
    test('called transformOrderData', () => {
        expect((0, transform_order_details_1.transformOrderDetails)('orderData', mock_config_1.transformMockOrderInput)).toEqual((0, transform_order_details_1.transformOrderDetails)('orderData', mock_config_1.transformMockOrderInput));
    });
});
describe('[ORDER-Transforms] - transformLinks', () => {
    test('should return correct count and result when links are provided', () => {
        const links = [
            { title: 'Link 1' },
            { title: 'Link 2' },
            { title: 'Link 3' },
        ];
        const expected = {
            count: 3,
            result: 'Link 1, Link 2, Link 3',
        };
        expect((0, transform_order_details_1.transformLinks)(links)).toEqual(expected);
    });
    test('should return null when links is an empty array', () => {
        const links = [];
        expect((0, transform_order_details_1.transformLinks)(links)).toBeNull();
    });
    test('should return null when links is undefined', () => {
        expect((0, transform_order_details_1.transformLinks)(undefined)).toBeNull();
    });
    test('should return null when links is null', () => {
        expect((0, transform_order_details_1.transformLinks)(null)).toBeNull();
    });
    test('should handle a single link correctly', () => {
        const links = [{ title: 'Single Link' }];
        const expected = {
            count: 1,
            result: 'Single Link',
        };
        expect((0, transform_order_details_1.transformLinks)(links)).toEqual(expected);
    });
});
describe('[ORDER-Transforms] - transformBundleOptions', () => {
    test('should return correct bundle options with valid data', () => {
        const data = [
            {
                uid: '123',
                label: 'Option 1',
                values: [{ product_name: 'Product A' }, { product_name: 'Product B' }],
            },
            {
                uid: '456',
                label: 'Option 2',
                values: [{ product_name: 'Product C' }],
            },
        ];
        const expected = {
            'Option 1': 'Product A, Product B',
            'Option 2': 'Product C',
        };
        expect((0, transform_order_details_1.transformBundleOptions)(data)).toEqual(expected);
    });
    test('should return null when data is an empty array', () => {
        const data = [];
        expect((0, transform_order_details_1.transformBundleOptions)(data)).toBeNull();
    });
    test('should return null when data is undefined', () => {
        expect((0, transform_order_details_1.transformBundleOptions)(undefined)).toBeNull();
    });
    test('should return null when data is null', () => {
        expect((0, transform_order_details_1.transformBundleOptions)(null)).toBeNull();
    });
    test('should handle missing values field gracefully', () => {
        const data = [
            {
                uid: '789',
                label: 'Option 3',
                values: [],
            },
        ];
        const expected = {
            'Option 3': '',
        };
        expect((0, transform_order_details_1.transformBundleOptions)(data)).toEqual(expected);
    });
    test('should handle missing label gracefully', () => {
        const data = [
            {
                uid: '789',
                label: null,
                values: [{ product_name: 'Product D' }],
            },
        ];
        const expected = {
            null: 'Product D',
        };
        expect((0, transform_order_details_1.transformBundleOptions)(data)).toEqual(expected);
    });
    test('should handle missing product_name in values gracefully', () => {
        const data = [
            {
                uid: '123',
                label: 'Option 1',
                values: [{ product_name: null }, { product_name: 'Product B' }],
            },
        ];
        const expected = {
            'Option 1': ', Product B',
        };
        expect((0, transform_order_details_1.transformBundleOptions)(data)).toEqual(expected);
    });
});
describe('[ORDER-Transforms] - transformConfigurableOptions', () => {
    test('should return undefined if item is null or undefined', () => {
        expect((0, transform_order_details_1.transformConfigurableOptions)(null)).toBeUndefined();
        expect((0, transform_order_details_1.transformConfigurableOptions)(undefined)).toBeUndefined();
    });
    test('should return undefined if item does not have selected_options', () => {
        const item = {};
        expect((0, transform_order_details_1.transformConfigurableOptions)(item)).toBeUndefined();
    });
    test('should return a correct object if selected_options are present', () => {
        const item = {
            selected_options: [
                { label: 'Color', value: 'Red' },
                { label: 'Size', value: 'M' },
            ],
        };
        const result = (0, transform_order_details_1.transformConfigurableOptions)(item);
        expect(result).toEqual({
            Color: 'Red',
            Size: 'M',
        });
    });
    test('should handle an empty selected_options array', () => {
        const item = {
            selected_options: [],
        };
        const result = (0, transform_order_details_1.transformConfigurableOptions)(item);
        expect(result).toEqual({});
    });
});
