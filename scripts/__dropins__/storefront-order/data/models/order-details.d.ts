import { AvailableActionsProps, MoneyProps, QueryType } from '../../types';
import { OrdersReturnPropsModel } from './customer-orders-return';

export type OrderAddressModel = {
    city: string;
    company: string;
    country: string;
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
    currentReturnOrderQuantity?: number;
    eligibleForReturn: boolean;
    productSku?: string;
    type?: string;
    discounted?: boolean;
    id: string;
    productName?: string;
    productUrlKey?: string;
    regularPrice?: MoneyProps;
    price?: MoneyProps;
    product?: OrderItemProductModel;
    selectedOptions?: Array<{
        label: string;
        value: any;
    }>;
    totalQuantity?: number;
    thumbnail?: {
        label: string;
        url: string;
    };
    downloadableLinks: {
        count: number;
        result: string;
    } | null;
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
    requestQuantity: number;
};
export type ShipmentItemsModel = {
    id: string;
    productSku: string;
    productName: string;
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
    returnNumber: string;
    id: string;
    orderStatusChangeDate?: string;
    number: string;
    email?: string;
    token?: string;
    status: string;
    isVirtual: boolean;
    totalQuantity: number;
    shippingMethod?: string;
    carrier?: string;
    orderDate: string;
    itemsEligibleForReturn?: OrderItemModel[];
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
    totalGiftcard: MoneyProps;
    grandTotal: MoneyProps;
    totalShipping?: MoneyProps;
    subtotal: MoneyProps;
    totalTax: MoneyProps;
    shippingAddress: OrderAddressModel;
    billingAddress: OrderAddressModel;
    availableActions: AvailableActionsProps[];
    taxes: {
        amount: MoneyProps;
        rate: number;
        title: string;
    }[];
};
export type TransformedData<T extends QueryType> = T extends 'orderData' ? OrderDataModel : null;
//# sourceMappingURL=order-details.d.ts.map