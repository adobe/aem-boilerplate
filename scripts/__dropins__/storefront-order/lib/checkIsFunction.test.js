"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkIsFunction_1 = require("@/order/lib/checkIsFunction");
describe('[Account-LIB] - checkIsFunction', () => {
    test('should return true for a function', () => {
        const func = () => { };
        expect((0, checkIsFunction_1.checkIsFunction)(func)).toBe(true);
    });
    test('should return false for a string', () => {
        const string = 'I am not a function';
        expect((0, checkIsFunction_1.checkIsFunction)(string)).toBe(false);
    });
    test('should return false for an object', () => {
        const obj = {};
        expect((0, checkIsFunction_1.checkIsFunction)(obj)).toBe(false);
    });
    test('should return false for a number', () => {
        const num = 123;
        expect((0, checkIsFunction_1.checkIsFunction)(num)).toBe(false);
    });
    test('should return false for null', () => {
        const nullValue = null;
        expect((0, checkIsFunction_1.checkIsFunction)(nullValue)).toBe(false);
    });
    test('should return false for undefined', () => {
        const undefinedValue = undefined;
        expect((0, checkIsFunction_1.checkIsFunction)(undefinedValue)).toBe(false);
    });
    test('should return false for an array', () => {
        const array = [];
        expect((0, checkIsFunction_1.checkIsFunction)(array)).toBe(false);
    });
    test('should return false for a boolean', () => {
        const bool = true;
        expect((0, checkIsFunction_1.checkIsFunction)(bool)).toBe(false);
    });
});
