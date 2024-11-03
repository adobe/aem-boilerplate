"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertToInputDateFormat_1 = require("@/order/lib/convertToInputDateFormat");
describe('[Account-LIB] - convertToInputDateFormat', () => {
    test('correctly formats a date string with two-digit month and day', () => {
        const date = '2023-12-25';
        const formattedDate = (0, convertToInputDateFormat_1.convertToInputDateFormat)(date);
        expect(formattedDate).toBe('2023-12-25');
    });
    test('adds leading zeros to one-digit month and day', () => {
        const date = '2023-1-5';
        const formattedDate = (0, convertToInputDateFormat_1.convertToInputDateFormat)(date);
        expect(formattedDate).toBe('2023-01-05');
    });
    test('returns an empty string when input is an empty string', () => {
        const date = '';
        const formattedDate = (0, convertToInputDateFormat_1.convertToInputDateFormat)(date);
        expect(formattedDate).toBe('');
    });
    test('handles invalid input by returning an empty string', () => {
        const date = 'invalid-date';
        const formattedDate = (0, convertToInputDateFormat_1.convertToInputDateFormat)(date);
        expect(formattedDate).toBe('');
    });
});
describe('[Account-LIB] - converDeliveryOrderDate', () => {
    test('should convert a valid date string to the correct locale date string', () => {
        const dateTimeString = '2023-08-30T12:34:56Z';
        const expectedDate = new Date(dateTimeString).toLocaleDateString();
        const result = (0, convertToInputDateFormat_1.converDeliveryOrderDate)(dateTimeString);
        expect(result).toBe(expectedDate);
    });
    test('should handle invalid date string', () => {
        const invalidDateTimeString = 'invalid-date-string';
        const result = (0, convertToInputDateFormat_1.converDeliveryOrderDate)(invalidDateTimeString);
        expect(result).toBe('Invalid Date');
    });
    test('should handle an empty string', () => {
        const emptyString = '';
        const result = (0, convertToInputDateFormat_1.converDeliveryOrderDate)(emptyString);
        expect(result).toBe('Invalid Date');
    });
    test('should handle a date already in string format', () => {
        const dateString = new Date().toLocaleDateString();
        const result = (0, convertToInputDateFormat_1.converDeliveryOrderDate)(dateString);
        expect(result).toBe(dateString);
    });
});
