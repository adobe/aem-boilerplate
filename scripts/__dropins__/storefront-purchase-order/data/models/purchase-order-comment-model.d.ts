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
export interface PurchaseOrderCommentModel {
    createdAt: string;
    text: string;
    uid: string;
    author: {
        allowRemoteShoppingAssistance: boolean;
        confirmationStatus: string;
        createdAt: string;
        dateOfBirth: string;
        email: string;
        firstname: string;
        gender: number;
        jobTitle: string;
        lastname: string;
        middlename: string;
        prefix: string;
        status: string;
        structureId: string;
        suffix: string;
        telephone: string;
    };
}
//# sourceMappingURL=purchase-order-comment-model.d.ts.map