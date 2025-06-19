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
/**
 * Parameters for the publish events
 *
 * item: The item that was added to the cart
 * pagePlacement: The placement of the item on the page
 * yOffsetTop: The y offset of the item from the top of the page
 * yOffsetBottom: The y offset of the item from the bottom of the page
 */
export interface PublishParams {
    recommendationUnit: any;
    pagePlacement: string;
    yOffsetTop: number;
    yOffsetBottom: number;
    backupProducts?: number;
    searchTime?: number;
}
/**
 * Publish a recs-item-add-to-cart-click event to the Adobe Client Data Layer (ACDL)
 *
 * See: https://experienceleague.adobe.com/en/docs/commerce/product-recommendations/developer/events#events
 * @param params - The parameters for the event
 */
export declare const publishRecsItemAddToCartClick: (params: PublishParams) => void;
//# sourceMappingURL=publishRecsItemAddToCartClick.d.ts.map