"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redirectTo_1 = require("./redirectTo");
jest.mock('./checkIsFunction');
describe('[Order-LIB] - redirectTo', () => {
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
        window.location.href = '';
    });
    test('does not redirect if getUrl is not a function', () => {
        // @ts-ignore
        (0, redirectTo_1.redirectTo)(null, { key: 'value' });
        expect(window.location.href).toBe('');
        // @ts-ignore
        (0, redirectTo_1.redirectTo)(undefined, { key: 'value' });
        expect(window.location.href).toBe('');
        // @ts-ignore
        (0, redirectTo_1.redirectTo)('not a function', { key: 'value' });
        expect(window.location.href).toBe('');
    });
    test('redirects without queryParams', () => {
        const mockUrl = 'https://example.com';
        const getUrl = jest.fn(() => mockUrl);
        (0, redirectTo_1.redirectTo)(getUrl);
        expect(getUrl).toHaveBeenCalled();
        expect(window.location.href).toBe(mockUrl);
    });
    test('redirects with empty queryParams', () => {
        const mockUrl = 'https://example.com';
        const getUrl = jest.fn(() => mockUrl);
        (0, redirectTo_1.redirectTo)(getUrl, {});
        expect(getUrl).toHaveBeenCalled();
        expect(window.location.href).toBe(mockUrl);
    });
    test('redirects with queryParams without existing "?" in URL', () => {
        const mockUrl = 'https://example.com/page';
        const getUrl = jest.fn(() => mockUrl);
        const queryParams = {
            search: 'test',
            page: 2,
        };
        (0, redirectTo_1.redirectTo)(getUrl, queryParams);
        const expectedUrl = `${mockUrl}?search=test&page=2`;
        expect(getUrl).toHaveBeenCalled();
        expect(window.location.href).toBe(expectedUrl);
    });
    test('redirects with queryParams with existing "?" in URL', () => {
        const mockUrl = 'https://example.com/page?existing=param';
        const getUrl = jest.fn(() => mockUrl);
        const queryParams = {
            search: 'test',
            page: 2,
        };
        (0, redirectTo_1.redirectTo)(getUrl, queryParams);
        const expectedUrl = `${mockUrl}&search=test&page=2`;
        expect(getUrl).toHaveBeenCalled();
        expect(window.location.href).toBe(expectedUrl);
    });
    test('correctly converts queryParams values to strings', () => {
        const mockUrl = 'https://example.com';
        const getUrl = jest.fn(() => mockUrl);
        const queryParams = {
            number: 123,
            boolean: true,
            // @ts-ignore
            nullValue: null,
            // @ts-ignore
            undefinedValue: undefined,
        };
        (0, redirectTo_1.redirectTo)(getUrl, queryParams);
        const expectedUrl = `${mockUrl}?number=123&boolean=true&nullValue=null&undefinedValue=undefined`;
        expect(getUrl).toHaveBeenCalled();
        expect(window.location.href).toBe(expectedUrl);
    });
    test('does not redirect if getUrl returns an empty string', () => {
        const getUrl = jest.fn(() => '');
        (0, redirectTo_1.redirectTo)(getUrl);
        expect(getUrl).toHaveBeenCalled();
        expect(window.location.href).toBe('');
    });
});
