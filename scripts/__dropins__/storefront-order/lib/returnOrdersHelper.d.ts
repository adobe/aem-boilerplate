declare const returnStatus: {
    readonly PENDING: "pending";
    readonly AUTHORIZED: "authorized";
    readonly PARTIALLY_AUTHORIZED: "partiallyAuthorized";
    readonly RECEIVED: "received";
    readonly PARTIALLY_RECEIVED: "partiallyReceived";
    readonly APPROVED: "approved";
    readonly PARTIALLY_APPROVED: "partiallyApproved";
    readonly REJECTED: "rejected";
    readonly PARTIALLY_REJECTED: "partiallyRejected";
    readonly DENIED: "denied";
    readonly PROCESSED_AND_CLOSED: "processedAndClosed";
    readonly CLOSED: "closed";
};
type ReturnStatusKey = keyof typeof returnStatus;
type ReturnStatusValue = (typeof returnStatus)[ReturnStatusKey];
export declare const formatReturnStatus: (str: string) => ReturnStatusValue | '';
export {};
//# sourceMappingURL=returnOrdersHelper.d.ts.map