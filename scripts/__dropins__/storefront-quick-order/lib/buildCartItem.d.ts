/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
export interface CartItem {
    sku: string;
    quantity: number;
    parentSku?: string;
    optionsUIDs?: string[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
}
/**
 * Builds a cart item object from form data
 * Extracts SKU, quantity, parent SKU, and product options
 */
export declare const buildCartItem: (formData: FormData) => CartItem;
//# sourceMappingURL=buildCartItem.d.ts.map