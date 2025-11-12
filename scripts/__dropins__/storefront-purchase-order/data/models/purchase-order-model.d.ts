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
export interface PurchaseOrderModel {
    typename: string;
    uid: string;
    number: string;
    status: string;
    availableActions: string[];
    approvalFlow: {
        ruleName: string;
        events: Array<{
            message: string;
            name: string;
            role: string;
            status: string;
            updatedAt: string;
        }>;
    }[] | [];
    comments?: Array<{
        uid: string;
        createdAt: string;
        author: {
            firstname: string;
            lastname: string;
            email: string;
        };
        text: string;
    }>;
    createdAt: string;
    updatedAt: string;
    createdBy: {
        firstname: string;
        lastname: string;
        email: string;
    };
    historyLog?: Array<{
        activity: string;
        createdAt: string;
        message: string;
        uid: string;
    }>;
    quote: QuoteProps | null;
    order: {
        orderNumber: string;
        id: string;
    };
}
type MoneyProps = {
    value: number;
    currency: string;
};
type OrderAddressProps = {
    firstName: string;
    lastName: string;
    middleName: string;
    city: string;
    company: string;
    country: string;
    countryCode: string;
    fax: string;
    postCode: string;
    prefix: string;
    region: string;
    regionId: string;
    street: string[];
    suffix: string;
    telephone: string;
    vatId: string;
    customAttributes: any[];
};
type OrderItemProductProps = {
    __typename: string;
    uid: string;
    onlyXLeftInStock: number;
    stockStatus: string;
    priceRange: {
        maximumPrice: {
            regularPrice: MoneyProps;
        };
    };
    canonicalUrl: string;
    urlKey: string;
    id: string;
    name: string;
    sku: string;
    image: string;
    imageAlt: string;
    productType: string;
    thumbnail: {
        label: string;
        url: string;
    };
};
type GiftMessageProps = {
    senderName: string;
    recipientName: string;
    message: string;
};
type GiftWrappingProps = {
    design: string;
    uid: string;
    selected: boolean;
    image: {
        url: string;
        label: string;
    };
    price: MoneyProps;
};
type TaxCalculationsProps = {
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
type ItemPricesProps = {
    price: MoneyProps;
    priceIncludingTax: MoneyProps;
    originalPrice: MoneyProps;
    originalPriceIncludingTax: MoneyProps;
    discounts: any[];
};
type OrderItemProps = {
    giftMessage: GiftMessageProps;
    giftWrappingPrice: MoneyProps;
    productGiftWrapping: GiftWrappingProps[];
    taxCalculations: TaxCalculationsProps;
    productSalePrice: MoneyProps;
    status: string;
    currentReturnOrderQuantity: number;
    eligibleForReturn: boolean;
    productSku: string;
    type: string;
    discounted: boolean;
    id: string;
    productName: string;
    productUrlKey: string;
    regularPrice: MoneyProps;
    price: MoneyProps;
    product: OrderItemProductProps;
    selectedOptions: any[];
    thumbnail: {
        label: string;
        url: string;
    };
    downloadableLinks: {
        count: number;
        result: string;
    } | null;
    prices: ItemPricesProps;
    itemPrices: ItemPricesProps;
    bundleOptions: Record<string, any> | null;
    totalInclTax: MoneyProps;
    priceInclTax: MoneyProps;
    total: MoneyProps;
    configurableOptions: Record<string, string> | undefined;
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
    requestQuantity: number;
    totalQuantity: number;
    returnableQuantity: number;
    quantityReturnRequested: number;
};
type PaymentMethodProps = {
    code: string;
    name: string;
};
type ShippingProps = {
    code: string;
    amount: number;
    currency: string;
};
type TaxProps = {
    amount: MoneyProps;
    rate: number;
    title: string;
};
type AppliedGiftCardProps = {
    code: string;
    appliedBalance: MoneyProps;
};
type GiftOptionsProps = {
    giftWrappingForItems: MoneyProps;
    giftWrappingForItemsInclTax: MoneyProps;
    giftWrappingForOrder: MoneyProps;
    giftWrappingForOrderInclTax: MoneyProps;
    printedCard: MoneyProps;
    printedCardInclTax: MoneyProps;
};
type ShipmentItemProps = {
    id: string;
    productName: string;
    productSku: string;
    quantityShipped: number;
    orderItem: OrderItemProps;
};
type ShipmentTrackingProps = {
    carrier: string;
    number: string;
    title: string;
};
type ShipmentProps = {
    id: string;
    number: string;
    tracking: ShipmentTrackingProps[];
    comments: {
        message: string;
        timestamp: string;
    }[];
    items: ShipmentItemProps[];
};
type QuoteProps = {
    giftReceiptIncluded: boolean;
    printedCardIncluded: boolean;
    giftWrappingOrder: {
        price: MoneyProps;
        uid: string;
    };
    placeholderImage: string;
    returnNumber: string | undefined;
    id: string;
    orderStatusChangeDate: string | undefined;
    number: string;
    email: string;
    token: string | undefined;
    status: string;
    isVirtual: boolean;
    totalQuantity: number;
    shippingMethod: string;
    carrier: string;
    orderDate: string;
    returns: any[];
    discounts: any[];
    coupons: any[];
    payments: PaymentMethodProps[];
    shipping: ShippingProps;
    shipments: ShipmentProps[];
    items: OrderItemProps[];
    totalGiftCard: MoneyProps;
    grandTotal: MoneyProps;
    totalShipping: MoneyProps;
    subtotalExclTax: MoneyProps;
    subtotalInclTax: MoneyProps;
    totalTax: MoneyProps;
    shippingAddress: OrderAddressProps | null;
    totalGiftOptions: GiftOptionsProps;
    billingAddress: OrderAddressProps | null;
    availableActions: string[];
    taxes: TaxProps[];
    appliedGiftCards: AppliedGiftCardProps[];
};
export {};
//# sourceMappingURL=purchase-order-model.d.ts.map