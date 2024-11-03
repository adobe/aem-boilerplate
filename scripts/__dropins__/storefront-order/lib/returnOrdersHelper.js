"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatReturnStatus = void 0;
const returnStatus = {
    PENDING: 'pending',
    AUTHORIZED: 'authorized',
    PARTIALLY_AUTHORIZED: 'partiallyAuthorized',
    RECEIVED: 'received',
    PARTIALLY_RECEIVED: 'partiallyReceived',
    APPROVED: 'approved',
    PARTIALLY_APPROVED: 'partiallyApproved',
    REJECTED: 'rejected',
    PARTIALLY_REJECTED: 'partiallyRejected',
    DENIED: 'denied',
    PROCESSED_AND_CLOSED: 'processedAndClosed',
    CLOSED: 'closed',
};
const formatReturnStatus = (str) => {
    if (typeof str !== 'string')
        return '';
    return returnStatus[str] ?? '';
};
exports.formatReturnStatus = formatReturnStatus;
