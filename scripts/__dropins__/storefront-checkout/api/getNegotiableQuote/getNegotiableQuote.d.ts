/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
type GetNegotiableQuoteInput = {
    uid?: string;
};
export declare const getNegotiableQuote: (input?: GetNegotiableQuoteInput) => Promise<import('../../data/models/quote').NegotiableQuote | null>;
export {};
//# sourceMappingURL=getNegotiableQuote.d.ts.map