/********************************************************************
 * ADOBE CONFIDENTIAL
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
type OrderDisplayPriceProps = 1 | 2 | 3;
export interface StoreConfigModel {
    baseMediaUrl: string;
    orderCancellationEnabled: boolean;
    orderCancellationReasons: OrderCancellationReason[];
    shoppingOrderDisplayPrice: OrderDisplayPriceProps;
    shoppingOrdersDisplayShipping: OrderDisplayPriceProps;
    shoppingOrdersDisplaySubtotal: OrderDisplayPriceProps;
    shoppingOrdersDisplayFullSummary: boolean;
    shoppingOrdersDisplayGrandTotal: boolean;
    shoppingOrdersDisplayZeroTax: boolean;
    salesPrintedCard: number;
    salesGiftWrapping: number;
}
export interface OrderCancellationReason {
    description: string;
}
export {};
//# sourceMappingURL=store-config.d.ts.map