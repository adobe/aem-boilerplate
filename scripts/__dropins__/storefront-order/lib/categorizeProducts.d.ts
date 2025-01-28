import { OrderDataModel, OrderItemModel } from '../data/models';

export declare const categorizeProducts: (order: OrderDataModel) => {
    returnedList: {
        totalQuantity: number;
        taxCalculations: {
            includeAndExcludeTax: {
                originalPrice: import('../types/index').MoneyProps;
                baseOriginalPrice: import('../types/index').MoneyProps;
                baseDiscountedPrice: import('../types/index').MoneyProps;
                baseExcludingTax: import('../types/index').MoneyProps;
            };
            excludeTax: {
                originalPrice: import('../types/index').MoneyProps;
                baseOriginalPrice: import('../types/index').MoneyProps;
                baseDiscountedPrice: import('../types/index').MoneyProps;
                baseExcludingTax: import('../types/index').MoneyProps;
            };
            includeTax: {
                singleItemPrice: import('../types/index').MoneyProps;
                baseOriginalPrice: import('../types/index').MoneyProps;
                baseDiscountedPrice: import('../types/index').MoneyProps;
            };
        };
        productSalePrice: import('../types/index').MoneyProps;
        status?: string | undefined;
        currentReturnOrderQuantity?: number | undefined;
        eligibleForReturn: boolean;
        productSku?: string | undefined;
        type?: string | undefined;
        discounted?: boolean | undefined;
        id: string;
        productName?: string | undefined;
        productUrlKey?: string | undefined;
        regularPrice?: import('../types/index').MoneyProps | undefined;
        price: import('../types/index').MoneyProps;
        product?: import('../data/models').OrderItemProductModel | undefined;
        selectedOptions?: {
            label: string;
            value: any;
        }[] | undefined;
        thumbnail?: {
            label: string;
            url: string;
        } | undefined;
        downloadableLinks: {
            count: number;
            result: string;
        } | null;
        prices: {
            priceIncludingTax: import('../types/index').MoneyProps;
            originalPrice: import('../types/index').MoneyProps;
            originalPriceIncludingTax: import('../types/index').MoneyProps;
            price: import('../types/index').MoneyProps;
            discounts: [{
                label: string;
                amount: {
                    value: number;
                };
            }];
        };
        itemPrices: {
            priceIncludingTax: import('../types/index').MoneyProps;
            originalPrice: import('../types/index').MoneyProps;
            originalPriceIncludingTax: import('../types/index').MoneyProps;
            price: import('../types/index').MoneyProps;
            discounts: [{
                label: string;
                amount: {
                    value: number;
                };
            }];
        };
        bundleOptions: Record<string, string> | null;
        totalInclTax: import('../types/index').MoneyProps;
        priceInclTax: import('../types/index').MoneyProps;
        total: import('../types/index').MoneyProps;
        configurableOptions: Record<string, string | number | boolean> | undefined;
        giftCard?: {
            senderName: string;
            senderEmail: string;
            recipientEmail: string;
            recipientName: string;
            message: string;
        } | undefined;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        requestQuantity?: number | undefined;
        returnableQuantity?: number | undefined;
        quantityReturnRequested: number;
    }[];
    canceledItems: OrderItemModel[];
    nonCanceledItems: OrderItemModel[];
};
//# sourceMappingURL=categorizeProducts.d.ts.map