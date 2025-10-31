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
export interface CompanyCreditHistoryItem {
    amount: {
        currency: string;
        value: number;
    };
    balance: {
        availableCredit: {
            currency: string;
            value: number;
        };
        creditLimit: {
            currency: string;
            value: number;
        };
        outstandingBalance: {
            currency: string;
            value: number;
        };
    };
    customReferenceNumber?: string;
    date: string;
    type: string;
    updatedBy: {
        name: string;
        type: string;
    };
}
export interface CompanyCreditHistoryPageInfo {
    currentPage: number;
    pageSize: number;
    totalPages: number;
}
export interface CompanyCreditHistory {
    items: CompanyCreditHistoryItem[];
    pageInfo: CompanyCreditHistoryPageInfo;
    totalCount: number;
}
//# sourceMappingURL=company-credit-history.d.ts.map