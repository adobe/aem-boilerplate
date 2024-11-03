"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatAddressFields_1 = require("./formatAddressFields");
describe('formatAddressFields', () => {
    it('should return fields sorted by orderNumber', () => {
        const fields = [
            { name: 'Field 2', orderNumber: 2, value: 'value2' },
            { name: 'Field 1', orderNumber: 1, value: 'value1' },
            { name: 'Field 3', orderNumber: 3, value: 'value3' },
        ];
        const result = (0, formatAddressFields_1.formatAddressFields)(fields);
        expect(result).toEqual([
            [
                { name: 'Field 1', orderNumber: 1, value: 'value1' },
                { name: 'Field 2', orderNumber: 2, value: 'value2' },
            ],
            [{ name: 'Field 3', orderNumber: 3, value: 'value3' }],
        ]);
    });
    it('should skip fields with invalid values', () => {
        const fields = [
            { name: 'Field 1', orderNumber: 1, value: '' },
            // @ts-ignore
            { name: 'Field 2', orderNumber: 2, value: null },
            { name: 'Field 3', orderNumber: 3, value: 'valid' },
        ];
        const result = (0, formatAddressFields_1.formatAddressFields)(fields);
        expect(result).toEqual([
            [{ name: 'Field 3', orderNumber: 3, value: 'valid' }],
        ]);
    });
    it('should group fields in rows based on their index', () => {
        const fields = [
            {
                name: 'firstname',
                orderNumber: 20,
                value: 'Neo',
                label: null,
            },
            {
                name: 'lastname',
                orderNumber: 40,
                value: 'Smith',
                label: null,
            },
            {
                name: 'street',
                orderNumber: 70,
                value: ['Test ', 'Street'],
                label: null,
            },
            {
                name: 'countryCode',
                orderNumber: 80,
                value: 'AS',
                label: null,
            },
            {
                name: 'region',
                orderNumber: 90,
                value: 'Region',
                label: null,
            },
            {
                name: 'city',
                orderNumber: 100,
                value: 'City',
                label: null,
            },
            {
                name: 'postcode',
                orderNumber: 110,
                value: '12345',
                label: null,
            },
            {
                name: 'telephone',
                orderNumber: 120,
                value: '123456789',
                label: null,
            },
        ];
        const result = (0, formatAddressFields_1.formatAddressFields)(fields);
        expect(result).toEqual([
            [
                {
                    name: 'firstname',
                    orderNumber: 20,
                    value: 'Neo',
                    label: null,
                },
                {
                    name: 'lastname',
                    orderNumber: 40,
                    value: 'Smith',
                    label: null,
                },
            ],
            [
                {
                    name: 'street',
                    orderNumber: 70,
                    value: 'Test ',
                    label: null,
                },
                {
                    name: 'street',
                    orderNumber: 70,
                    value: 'Street',
                    label: null,
                },
            ],
            [
                {
                    name: 'countryCode',
                    orderNumber: 80,
                    value: 'AS',
                    label: null,
                },
                {
                    name: 'region',
                    orderNumber: 90,
                    value: 'Region',
                    label: null,
                },
            ],
            [
                {
                    name: 'city',
                    orderNumber: 100,
                    value: 'City',
                    label: null,
                },
                {
                    name: 'postcode',
                    orderNumber: 110,
                    value: '12345',
                    label: null,
                },
            ],
            [
                {
                    name: 'telephone',
                    orderNumber: 120,
                    value: '123456789',
                    label: null,
                },
            ],
        ]);
    });
    it('should handle an empty fields array', () => {
        const fields = [];
        const result = (0, formatAddressFields_1.formatAddressFields)(fields);
        expect(result).toEqual([]);
    });
});
