/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export interface CustomerPaymentTokenItem {
    details: string;
    public_hash: string;
    payment_method_code: string;
    type: string;
}
export interface GetCustomerPaymentTokensResponse {
    data?: {
        customerPaymentTokens?: {
            items?: CustomerPaymentTokenItem[];
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomerPaymentTokens.types.d.ts.map