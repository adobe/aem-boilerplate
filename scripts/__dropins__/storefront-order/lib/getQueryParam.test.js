"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// getQueryParam.test.ts
const getQueryParam_1 = require("./getQueryParam");
describe('getQueryParam', () => {
    const originalLocation = window.location;
    beforeAll(() => {
        // @ts-ignore
        delete window.location;
        window.location = {
            href: '',
        };
    });
    afterAll(() => {
        window.location = originalLocation;
    });
    beforeEach(() => {
        window.location.href = ''; // Reset before each test
    });
    test('returns the value of an existing query parameter', () => {
        window.location.href = 'https://example.com/order?orderRef=ABC123';
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        expect(orderRef).toBe('ABC123');
    });
    test('returns null when the query parameter does not exist', () => {
        window.location.href = 'https://example.com/order';
        const userId = (0, getQueryParam_1.getQueryParam)('userId');
        expect(userId).toBeNull();
    });
    test('handles URLs with multiple query parameters', () => {
        window.location.href =
            'https://example.com/search?query=Jest&sort=asc&page=2';
        const sort = (0, getQueryParam_1.getQueryParam)('sort');
        const page = (0, getQueryParam_1.getQueryParam)('page');
        expect(sort).toBe('asc');
        expect(page).toBe('2');
    });
    test('handles URLs with hash fragments', () => {
        window.location.href = 'https://example.com/order?orderRef=XYZ789#section1';
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        expect(orderRef).toBe('XYZ789');
    });
    test('returns empty string when the query parameter is present but has no value', () => {
        window.location.href = 'https://example.com/order?orderRef=';
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        expect(orderRef).toBe('');
    });
    test('returns null for invalid URLs', () => {
        window.location.href = 'ht!tp://:::/';
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        expect(orderRef).toBeNull();
    });
    test('is case-sensitive with query parameter names', () => {
        window.location.href = 'https://example.com/order?OrderRef=ABC123';
        const orderRef = (0, getQueryParam_1.getQueryParam)('orderRef');
        const OrderRef = (0, getQueryParam_1.getQueryParam)('OrderRef');
        expect(orderRef).toBeNull();
        expect(OrderRef).toBe('ABC123');
    });
    test('handles query parameters with special characters', () => {
        window.location.href =
            'https://example.com/search?query=Jest%20Testing%20%26%20TypeScript';
        const query = (0, getQueryParam_1.getQueryParam)('query');
        expect(query).toBe('Jest Testing & TypeScript');
    });
});
