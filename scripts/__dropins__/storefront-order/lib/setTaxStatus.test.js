"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setTaxStatus_1 = require("./setTaxStatus");
describe('[Order-LIB] - setTaxStatus', () => {
    it('should set taxExcluded to true when displayPrice is 1', () => {
        const result = (0, setTaxStatus_1.setTaxStatus)(1);
        expect(result.taxIncluded).toBe(false);
        expect(result.taxExcluded).toBe(true);
    });
    it('should set taxIncluded to true when displayPrice is 2', () => {
        const result = (0, setTaxStatus_1.setTaxStatus)(2);
        expect(result.taxIncluded).toBe(true);
        expect(result.taxExcluded).toBe(false);
    });
    it('should set both taxIncluded and taxExcluded to true when displayPrice is 3', () => {
        const result = (0, setTaxStatus_1.setTaxStatus)(3);
        expect(result.taxIncluded).toBe(true);
        expect(result.taxExcluded).toBe(true);
    });
    it('should set both taxIncluded and taxExcluded to false when displayPrice is not 1, 2, or 3', () => {
        const result = (0, setTaxStatus_1.setTaxStatus)(0);
        expect(result.taxIncluded).toBe(false);
        expect(result.taxExcluded).toBe(false);
    });
    it('should set both taxIncluded and taxExcluded to false for negative numbers', () => {
        const result = (0, setTaxStatus_1.setTaxStatus)(-1);
        expect(result.taxIncluded).toBe(false);
        expect(result.taxExcluded).toBe(false);
    });
    it('should set both taxIncluded and taxExcluded to false for a large number not in the range', () => {
        const result = (0, setTaxStatus_1.setTaxStatus)(999);
        expect(result.taxIncluded).toBe(false);
        expect(result.taxExcluded).toBe(false);
    });
});
