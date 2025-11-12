/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface CloseNegotiableQuoteInput {
    quoteUids: string[];
}
export interface CloseNegotiableQuoteSuccessResult {
    __typename: 'NegotiableQuoteUidOperationSuccess';
    quoteUid: string;
}
export interface CloseNegotiableQuoteFailureError {
    __typename: string;
    message?: string;
    uid?: string;
}
export interface CloseNegotiableQuoteFailureResult {
    __typename: 'CloseNegotiableQuoteOperationFailure';
    quoteUid: string;
    errors: CloseNegotiableQuoteFailureError[];
}
export interface CloseNegotiableQuoteResult {
    resultStatus: string;
    operationResults: Array<CloseNegotiableQuoteSuccessResult | CloseNegotiableQuoteFailureResult>;
}
export declare const closeNegotiableQuote: (input: CloseNegotiableQuoteInput) => Promise<CloseNegotiableQuoteResult>;
//# sourceMappingURL=closeNegotiableQuote.d.ts.map