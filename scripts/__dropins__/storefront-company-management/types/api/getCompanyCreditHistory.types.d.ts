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
export interface CompanyCreditHistoryResponse {
    data: {
        company: {
            credit_history: {
                items: {
                    amount: {
                        currency: string;
                        value: number;
                    };
                    balance: {
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
                    custom_reference_number?: string;
                    date: string;
                    type: string;
                    updated_by: {
                        name: string;
                        type: string;
                    };
                }[];
                page_info: {
                    current_page: number;
                    page_size: number;
                    total_pages: number;
                };
                total_count: number;
            };
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCompanyCreditHistory.types.d.ts.map