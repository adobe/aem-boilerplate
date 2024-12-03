import { Price } from './price';

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
    prefix: string;
    suffix: string;
    fax: string;
} | null;
export type OrderItemProductModel = {
    stockStatus?: string;
    canonicalUrl?: string;
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
    type?: string;
    discounted?: boolean;
    id: string;
    productName?: string;
    regularPrice?: Price;
    price?: Price;
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
        priceIncludingTax: Price;
        originalPrice: Price;
        originalPriceIncludingTax: Price;
        price: Price;
    };
    bundleOptions: Record<string, string> | null;
    totalInclTax: Price;
    priceInclTax: Price;
    total: Price;
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
    discounts: {
        amount: Price;
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
    totalGiftcard: Price;
    grandTotal: Price;
    totalShipping?: Price;
    subtotal: Price;
    totalTax: Price;
    shippingAddress: OrderAddressModel;
    billingAddress: OrderAddressModel;
    availableActions: AvailableActionsProps[];
    taxes: {
        amount: Price;
        rate: number;
        title: string;
    }[];
};
declare enum AvailableActionsProps {
    CANCEL = "CANCEL",
    RETURN = "RETURN",
    REORDER = "REORDER"
}
export {};
//# sourceMappingURL=order.d.ts.map