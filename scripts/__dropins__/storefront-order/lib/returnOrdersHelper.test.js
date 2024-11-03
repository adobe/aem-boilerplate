"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnOrdersHelper_1 = require("./returnOrdersHelper");
describe('formatReturnStatus', () => {
    it('should return the correct value for each valid key', () => {
        expect((0, returnOrdersHelper_1.formatReturnStatus)('PENDING')).toBe('pending');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('AUTHORIZED')).toBe('authorized');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('PARTIALLY_AUTHORIZED')).toBe('partiallyAuthorized');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('RECEIVED')).toBe('received');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('PARTIALLY_RECEIVED')).toBe('partiallyReceived');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('APPROVED')).toBe('approved');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('PARTIALLY_APPROVED')).toBe('partiallyApproved');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('REJECTED')).toBe('rejected');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('PARTIALLY_REJECTED')).toBe('partiallyRejected');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('DENIED')).toBe('denied');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('PROCESSED_AND_CLOSED')).toBe('processedAndClosed');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('CLOSED')).toBe('closed');
    });
    it('should return an empty string for an invalid key', () => {
        expect((0, returnOrdersHelper_1.formatReturnStatus)('INVALID_KEY')).toBe('');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('UNKNOWN')).toBe('');
        expect((0, returnOrdersHelper_1.formatReturnStatus)('')).toBe('');
    });
    it('should return an empty string for non-string input', () => {
        // @ts-ignore - ignore TypeScript warning for non-string input
        expect((0, returnOrdersHelper_1.formatReturnStatus)(null)).toBe('');
        // @ts-ignore
        expect((0, returnOrdersHelper_1.formatReturnStatus)(undefined)).toBe('');
        // @ts-ignore
        expect((0, returnOrdersHelper_1.formatReturnStatus)(123)).toBe('');
        // @ts-ignore
        expect((0, returnOrdersHelper_1.formatReturnStatus)({})).toBe('');
        // @ts-ignore
        expect((0, returnOrdersHelper_1.formatReturnStatus)([])).toBe('');
    });
});
