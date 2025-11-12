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
export interface Money {
    value: number;
    currency: string;
}
export interface Coupon {
    code: string;
    label: string;
}
export interface GiftCard {
    code: string;
    appliedBalance: Money;
    currentBalance: Money;
}
export interface CustomerAddress {
    firstname: string;
    lastname: string;
    street: string[];
    city: string;
    region: string;
    postcode: string;
    countryCode: string;
    telephone: string;
    company: string;
}
export interface PaymentMethod {
    name: string;
    type: string;
    additionalData: Record<string, any>;
}
export interface OrderItem {
    id: string;
    productName: string;
    productSku: string;
    quantityOrdered: number;
    quantityShipped: number;
    quantityInvoiced: number;
    quantityRefunded: number;
    price: Money;
    total: Money;
}
export interface Shipment {
    id: string;
    number: string;
    tracking: ShipmentTracking[];
    comments: ShipmentComment[];
    items: ShipmentItem[];
}
export interface ShipmentTracking {
    number: string;
    carrier: string;
    title: string;
}
export interface ShipmentComment {
    message: string;
    timestamp: string;
}
export interface ShipmentItem {
    id: string;
    productName: string;
    productSku: string;
    quantityShipped: number;
}
export interface CustomerInfo {
    firstname: string;
    lastname: string;
    email: string;
}
export interface OrderTotal {
    baseGrandTotal: Money;
    grandTotal: Money;
    subtotal: Money;
    totalTax: Money;
    totalShipping: Money;
    discounts: OrderDiscount[];
}
export interface OrderDiscount {
    label: string;
    amount: Money;
}
export interface CustomerOrderModel {
    appliedCoupons: Coupon[];
    appliedGiftCards: GiftCard[];
    availableActions: string[];
    billingAddress: CustomerAddress;
    carrier: string;
    comments: string[];
    creditMemos: any[];
    customerInfo: CustomerInfo;
    email: string;
    giftMessage: string;
    giftReceiptIncluded: boolean;
    giftWrapping: any;
    id: string;
    invoices: any[];
    isVirtual: boolean;
    items: OrderItem[];
    itemsEligibleForReturn: any[];
    number: string;
    orderDate: string;
    orderStatusChangeDate: string;
    paymentMethods: PaymentMethod[];
    printedCardIncluded: boolean;
    returns: any;
    shipments: Shipment[];
    shippingAddress: CustomerAddress;
    shippingMethod: string;
    status: string;
    token: string;
    total: OrderTotal;
}
//# sourceMappingURL=customer-order-model.d.ts.map