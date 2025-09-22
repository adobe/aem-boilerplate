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
export interface RecommendationUnitModel {
    displayOrder: number;
    pageType: PageType;
    title: string;
    items: Item[];
    totalProducts: number;
    typeId: string;
    unitId: string;
    unitName: string;
}
export type PageType = 'Product';
export interface Item {
    uid: string;
    sku: string;
    name: string;
    urlKey: string;
    images: ItemImage[];
    price: FinalPrice;
    priceRange?: {
        minimum?: FinalPrice;
        maximum?: FinalPrice;
    };
    visibility: string;
    queryType: string;
    itemType: string;
}
interface ItemImage {
    label: string;
    roles: string[];
    url: string;
}
export interface Price {
    value: number;
    currency: string;
}
export interface FinalPrice {
    final?: {
        amount?: Price;
    };
}
export interface RecommendationsResponse {
    results: RecommendationUnitModel[];
    totalResults: number;
}
export interface GraphQLResponse {
    errors?: Array<{
        message: string;
    }>;
    data?: {
        recommendations: RecommendationsResponse;
    };
}
export {};
//# sourceMappingURL=recommendations-model.d.ts.map