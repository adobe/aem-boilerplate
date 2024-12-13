/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2024 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
export type Options = {
    anchors?: string[];
    optionsUIDs?: string[];
    preselectFirstOption?: boolean;
    isBundle?: boolean;
    skipTransform?: boolean;
};
export declare const fetchProductData: (sku: string, options?: Options) => Promise<import('../../data/models/product-model').ProductModel | null>;
//# sourceMappingURL=fetchProductData.d.ts.map