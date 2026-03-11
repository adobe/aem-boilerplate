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
/**
 * Extract optionsUIDs from various data formats
 */
export declare const extractOptionsUIDs: (valuesData: any) => string[];
/**
 * Get options from localStorage
 */
export declare const getOptionsFromStorage: (storageKey: string) => Record<string, string[]>;
/**
 * Save options to localStorage
 */
export declare const saveOptionsToStorage: (storageKey: string, itemId: string, optionsUIDs: string[]) => void;
/**
 * Enrich cart items with selected options from storage
 */
export declare const enrichCartItemsWithOptions: <T extends {
    sku: string;
}>(cartItems: T[], items: Array<{
    id?: string;
    sku: string;
    variantSku?: string;
}>, storageData: Record<string, string[]>) => (T & {
    optionsUIDs?: string[] | undefined;
})[];
//# sourceMappingURL=productOptionsStorage.d.ts.map