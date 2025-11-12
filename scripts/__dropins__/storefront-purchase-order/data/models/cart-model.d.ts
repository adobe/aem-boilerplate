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
export interface CartModel {
    cart: {
        id: string;
        items: {
            uid: string;
            quantity: number;
            product: {
                uid: string;
                name: string;
                sku: string;
            };
        }[];
        pagination?: {
            currentPage: number;
            pageSize: number;
            totalPages: number;
            totalCount: number;
        };
    };
    userErrors: Array<{
        message: string;
    }>;
}
//# sourceMappingURL=cart-model.d.ts.map