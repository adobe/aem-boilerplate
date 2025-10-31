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
export interface CompanyCreditResponse {
    data: {
        company: {
            credit: {
                available_credit: {
                    currency: string;
                    value: number;
                };
                credit_limit: {
                    currency: string;
                    value: number;
                };
                outstanding_balance: {
                    currency: string;
                    value: number;
                };
            };
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCompanyCredit.types.d.ts.map