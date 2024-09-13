import { Price } from './price';

type OrderPayment = {
    code: string;
    name: string;
};
type OrderCoupon = {
    code: string;
};
export type OrderItemProduct = {
    canonicalUrl?: string;
    id: string;
    image?: string;
    imageAlt?: string;
    name: string;
    productType: string;
    sku: string;
};
export type OrderItem = {
    type: string;
    discounted: boolean;
    id: string;
    regularPrice: Price;
    price: Price;
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
    coupons: OrderCoupon[];
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
    token: string;
    totalQuantity: number;
    totalTax: Price;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
};
export {};
//# sourceMappingURL=order.d.ts.map