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
export interface PurchaseOrderApprovalRuleModel {
    createdAt: string;
    createdBy: string;
    description: string;
    updatedAt: string;
    name: string;
    status: string;
    uid: string;
    appliesToRoles: {
        id: string;
        name: string;
        usersCount: number;
        permissions: Array<{
            id: string;
            sortOrder: number;
            text: string;
        }>;
    }[];
    condition: {
        attribute: string;
        operator: string;
        quantity: number;
        amount: {
            currency: string;
            value: number;
        };
    };
    approverRoles: {
        id: string;
        name: string;
        usersCount: number;
        permissions: Array<{
            id: string;
            sortOrder: number;
            text: string;
        }>;
    }[];
}
//# sourceMappingURL=purchase-order-approval-rule-model.d.ts.map