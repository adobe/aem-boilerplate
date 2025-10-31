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
export declare enum CompanyCreditOperationType {
    ALLOCATION = "ALLOCATION",
    UPDATE = "UPDATE",
    PURCHASE = "PURCHASE",
    REIMBURSEMENT = "REIMBURSEMENT"
}
export interface CompanyCreditHistoryFilterInput {
    /**
     * The purchase order number associated with the company credit operation.
     */
    customReferenceNumber?: string;
    /**
     * The type of the company credit operation.
     */
    operationType?: CompanyCreditOperationType;
    /**
     * The name of the person submitting the company credit operation.
     */
    updatedBy?: string;
}
export interface GetCompanyCreditHistoryParams {
    /**
     * Filter criteria for narrowing the results of a credit history search.
     */
    filter?: CompanyCreditHistoryFilterInput;
    /**
     * Number of items to return per page.
     * @default 20
     */
    pageSize?: number;
    /**
     * Current page number.
     * @default 1
     */
    currentPage?: number;
}
//# sourceMappingURL=getCompanyCreditHistoryParams.types.d.ts.map