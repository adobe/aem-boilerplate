import { AvailableActionsProps, MoneyProps, QueryType } from '../../types';
import { OrdersReturnPropsModel } from './customer-orders-return';

export type OrderAddressModel = {
    city: string;
    company: string;
    countryCode: string;
    firstName: string;
    middleName: string;
    lastName: string;
    postCode: string;
    region: string;
    regionId: string;
    street: string[];
    telephone: string;
    customAttributes: {
        code: string;
        value: string;
    }[];
} | null;
export type OrderItemProductModel = {
    onlyXLeftInStock?: number;
    priceRange?: {
        maximumPrice?: {
            regularPrice?: MoneyProps;
        };
    };
    uid: string;
    __typename: string;
    stockStatus?: string;
    canonicalUrl?: string;
    urlKey?: string;
    id: string;
    image?: string;
    imageAlt?: string;
    name: string;
    productType: string;
    sku: string;
    thumbnail: {
        url: string;
        label: string;
    };
};
export type OrderItemModel = {
    giftMessage: {
        senderName: string;
        recipientName: string;
        message: string;
    };
    giftWrappingPrice: MoneyProps;
    productGiftWrapping: {
        uid: string;
        design: string;
        selected: boolean;
        image: {
            url: string;
            label: string;
        };
        price: MoneyProps;
    }[];
    taxCalculations: {
        includeAndExcludeTax: {
            originalPrice: MoneyProps;
            baseOriginalPrice: MoneyProps;
            baseDiscountedPrice: MoneyProps;
            baseExcludingTax: MoneyProps;
        };
        excludeTax: {
            originalPrice: MoneyProps;
            baseOriginalPrice: MoneyProps;
            baseDiscountedPrice: MoneyProps;
            baseExcludingTax: MoneyProps;
        };
        includeTax: {
            singleItemPrice: MoneyProps;
            baseOriginalPrice: MoneyProps;
            baseDiscountedPrice: MoneyProps;
        };
    };
    productSalePrice: MoneyProps;
    status?: string;
    currentReturnOrderQuantity?: number;
    eligibleForReturn: boolean;
    productSku?: string;
    type?: string;
    discounted?: boolean;
    id: string;
    productName?: string;
    productUrlKey?: string;
    regularPrice?: MoneyProps;
    price: MoneyProps;
    product?: OrderItemProductModel;
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
        priceIncludingTax: MoneyProps;
        originalPrice: MoneyProps;
        originalPriceIncludingTax: MoneyProps;
        price: MoneyProps;
        discounts: [
            {
                label: string;
                amount: {
                    value: number;
                };
            }
        ];
    };
    itemPrices: {
        priceIncludingTax: MoneyProps;
        originalPrice: MoneyProps;
        originalPriceIncludingTax: MoneyProps;
        price: MoneyProps;
        discounts: [
            {
                label: string;
                amount: {
                    value: number;
                };
            }
        ];
    };
    bundleOptions: Record<string, string> | null;
    totalInclTax: MoneyProps;
    priceInclTax: MoneyProps;
    total: MoneyProps;
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
    totalQuantity: number;
    returnableQuantity?: number;
    quantityReturnRequested: number;
};
export type ShipmentItemsModel = {
    id: string;
    productSku: string;
    productName: string;
    quantityShipped: number;
    orderItem: OrderItemModel;
};
export type ShipmentsTracingModel = {
    carrier: string;
    number: string;
    title: string;
};
export type ShipmentsModel = {
    id: string;
    number: string;
    tracking: ShipmentsTracingModel[];
    comments: {
        message: string;
        timestamp: string;
    }[];
    items: ShipmentItemsModel[];
};
export type OrderDataModel = {
    giftReceiptIncluded: boolean;
    printedCardIncluded: boolean;
    giftWrappingOrder: {
        price: MoneyProps;
        uid: string;
    };
    placeholderImage?: string;
    returnNumber?: string;
    id: string;
    orderStatusChangeDate?: string;
    number: string;
    email: string;
    token?: string;
    status: string;
    isVirtual: boolean;
    totalQuantity: number;
    shippingMethod?: string;
    carrier?: string;
    orderDate: string;
    returns: OrdersReturnPropsModel[];
    discounts: {
        amount: MoneyProps;
        label: string;
    }[];
    coupons: {
        code: string;
    }[];
    payments: {
        code: string;
        name: string;
    }[];
    shipping?: {
        code: string;
        amount: number;
        currency: string;
    };
    shipments: ShipmentsModel[];
    items: OrderItemModel[];
    totalGiftCard: MoneyProps;
    grandTotal: MoneyProps;
    grandTotalExclTax: MoneyProps;
    totalShipping?: MoneyProps;
    subtotalExclTax: MoneyProps;
    subtotalInclTax: MoneyProps;
    totalTax: MoneyProps;
    shippingAddress: OrderAddressModel;
    totalGiftOptions: {
        giftWrappingForItems: MoneyProps;
        giftWrappingForItemsInclTax: MoneyProps;
        giftWrappingForOrder: MoneyProps;
        giftWrappingForOrderInclTax: MoneyProps;
        printedCard: MoneyProps;
        printedCardInclTax: MoneyProps;
    };
    billingAddress: OrderAddressModel;
    availableActions: AvailableActionsProps[];
    taxes: {
        amount: MoneyProps;
        rate: number;
        title: string;
    }[];
    appliedGiftCards: {
        code: string;
        appliedBalance: MoneyProps;
    }[];
};
export type TransformedData<T extends QueryType> = T extends 'orderData' ? OrderDataModel : null;
//# sourceMappingURL=order-details.d.ts.map