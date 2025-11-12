/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface DeleteQuoteSuccessResult {
    __typename: 'NegotiableQuoteUidOperationSuccess';
    quoteUid: string;
}
export interface DeleteQuoteFailureError {
    __typename: string;
    message?: string;
    uid?: string;
}
export interface DeleteQuoteFailureResult {
    __typename: 'DeleteNegotiableQuoteOperationFailure';
    quoteUid: string;
    errors: DeleteQuoteFailureError[];
}
export interface DeleteQuoteOutput {
    resultStatus: string;
    operationResults: Array<DeleteQuoteSuccessResult | DeleteQuoteFailureResult>;
}
export declare const deleteQuote: (quoteUids: string[] | string) => Promise<DeleteQuoteOutput>;
//# sourceMappingURL=deleteQuote.d.ts.map