import { Price } from '.';

type OrderPayment = {
    code: string;
    name: string;
};
export type OrderItemProduct = {
    name: string;
    productType: string;
    sku: string;
};
export type OrderItem = {
    type: string;
    id: string;
    discounted: boolean;
    total: Price;
    totalInclTax: Price;
    regularPrice: Price;
    price: Price;
    priceInclTax: Price;
    product: OrderItemProduct;
    selectedOptions?: Array<{
        label: string;
        value: any;
    }>;
    totalQuantity: number;
    thumbnail: {
        label: string;
        url: string;
    };
    giftCard?: {
        senderName: string;
        senderEmail: string;
        recipientEmail: string;
        recipientName: string;
    };
    configurableOptions?: Record<string, string>;
};
export type OrderAddress = {
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
export type Order = {
    status: string;
    isVirtual: boolean;
    email: string;
    items: OrderItem[];
    number: string;
    payments: OrderPayment[];
    shipping?: {
        code: string;
        amount: number;
        currency: string;
    };
    grandTotal: Price;
    subtotal: Price;
    totalQuantity: number;
    totalTax: Price;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
};
export {};
//# sourceMappingURL=order.d.ts.map