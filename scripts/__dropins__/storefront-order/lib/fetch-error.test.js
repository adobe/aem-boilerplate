"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_error_1 = require("./fetch-error");
describe('[Account-LIB] - handleFetchError', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('throws an error with a combined message from a list of error objects', () => {
        const errors = [{ message: 'Error 1' }, { message: 'Error 2' }];
        expect(() => (0, fetch_error_1.handleFetchError)(errors)).toThrow('Error 1 Error 2');
    });
    test('throws an error with a single message if only one error is provided', () => {
        const errors = [{ message: 'Single Error' }];
        expect(() => (0, fetch_error_1.handleFetchError)(errors)).toThrow('Single Error');
    });
    test('throws an error with an empty message if no errors are provided', () => {
        const errors = [];
        expect(() => (0, fetch_error_1.handleFetchError)(errors)).toThrow('');
    });
});
