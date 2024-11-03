"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const transform_customer_1 = require("./transform-customer");
describe('[Account-Transform] - transformCustomer', () => {
    test('correctly transforms customer data with all fields present', () => {
        const response = {
            data: {
                customer: {
                    email: 'john.doe@example.com',
                    firstname: 'John',
                    lastname: 'Doe',
                },
            },
        };
        expect((0, transform_customer_1.transformCustomer)(response)).toEqual({
            email: 'john.doe@example.com',
            firstname: 'John',
            lastname: 'Doe',
        });
    });
    test('returns empty strings for missing fields', () => {
        const response = {
            data: {
                customer: {
                    email: 'john.doe@example.com',
                },
            },
        };
        expect((0, transform_customer_1.transformCustomer)(response)).toEqual({
            email: 'john.doe@example.com',
            firstname: '',
            lastname: '',
        });
    });
    test('handles null or undefined input gracefully', () => {
        expect((0, transform_customer_1.transformCustomer)(null)).toEqual({
            email: '',
            firstname: '',
            lastname: '',
        });
        expect((0, transform_customer_1.transformCustomer)(undefined)).toEqual({
            email: '',
            firstname: '',
            lastname: '',
        });
    });
    test('handles responses without a data object', () => {
        const response = {};
        expect((0, transform_customer_1.transformCustomer)(response)).toEqual({
            email: '',
            firstname: '',
            lastname: '',
        });
    });
});
