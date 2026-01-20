import { OrderDataModel, OrderItemModel } from '../data/models';

export declare const categorizeProducts: (order: OrderDataModel) => {
    returnedList: {
        totalQuantity: number;
        giftMessage: {
            senderName: string;
            recipientName: string;
            message: string;
        };
        giftWrappingPrice: import('../types').MoneyProps;
        productGiftWrapping: {
            uid: string;
            design: string;
            selected: boolean;
            image: {
                url: string;
                label: string;
            };
            price: import('../types').MoneyProps;
        }[];
        taxCalculations: {
            includeAndExcludeTax: {
                originalPrice: import('../types').MoneyProps;
                baseOriginalPrice: import('../types').MoneyProps;
                baseDiscountedPrice: import('../types').MoneyProps;
                baseExcludingTax: import('../types').MoneyProps;
            };
            excludeTax: {
                originalPrice: import('../types').MoneyProps;
                baseOriginalPrice: import('../types').MoneyProps;
                baseDiscountedPrice: import('../types').MoneyProps;
                baseExcludingTax: import('../types').MoneyProps;
            };
            includeTax: {
                singleItemPrice: import('../types').MoneyProps;
                baseOriginalPrice: import('../types').MoneyProps;
                baseDiscountedPrice: import('../types').MoneyProps;
            };
        };
        productSalePrice: import('../types').MoneyProps;
        status?: string;
        currentReturnOrderQuantity?: number;
        eligibleForReturn: boolean;
        productSku?: string;
        type?: string;
        discounted?: boolean;
        id: string;
        productName?: string;
        productUrlKey?: string;
        regularPrice?: import('../types').MoneyProps;
        price: import('../types').MoneyProps;
        product?: import('../data/models').OrderItemProductModel;
        selectedOptions?: Array<{
            label: string;
            value: any;
        }>;
        thumbnail?: {
            label: string;
            url: string;
        };
        downloadableLinks: {
            count: number;
            result: string;
        } | null;
        prices: {
            priceIncludingTax: import('../types').MoneyProps;
            originalPrice: import('../types').MoneyProps;
            originalPriceIncludingTax: import('../types').MoneyProps;
            price: import('../types').MoneyProps;
            discounts: [{
                label: string;
                amount: {
                    value: number;
                };
            }];
        };
        itemPrices: {
            priceIncludingTax: import('../types').MoneyProps;
            originalPrice: import('../types').MoneyProps;
            originalPriceIncludingTax: import('../types').MoneyProps;
            price: import('../types').MoneyProps;
            discounts: [{
                label: string;
                amount: {
                    value: number;
                };
            }];
        };
        bundleOptions: Record<string, string> | null;
        totalInclTax: import('../types').MoneyProps;
        priceInclTax: import('../types').MoneyProps;
        total: import('../types').MoneyProps;
        configurableOptions: Record<string, string | number | boolean> | undefined;
        giftCard?: {
            senderName: string;
            senderEmail: string;
            recipientEmail: string;
            recipientName: string;
            message: string;
        };
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        requestQuantity?: number;
        returnableQuantity?: number;
        quantityReturnRequested: number;
    }[];
    canceledItems: OrderItemModel[];
    nonCanceledItems: OrderItemModel[];
};
//# sourceMappingURL=categorizeProducts.d.ts.map