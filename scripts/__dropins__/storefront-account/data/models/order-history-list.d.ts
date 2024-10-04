import { CustomerAddressesModel } from './customer-address';

export type ProductImage = {
    url: string;
};
export type Product = {
    smallImage: ProductImage;
};
export type OrderItem = {
    quantityOrdered?: number;
    quantityShipped?: number;
    quantityInvoiced?: number;
    status: string;
    productName: string;
    id: string;
    product: Product;
};
export type PaymentMethod = {
    name: string;
};
export type MoneyAmount = {
    value: number;
    currency: string;
};
export type Discount = {
    amount: MoneyAmount;
    label: string;
};
export type Tax = {
    amount: MoneyAmount;
    rate: number;
    title: string;
};
export type OrderTotals = {
    discounts: Discount[];
    grandTotal: MoneyAmount;
    subtotal: MoneyAmount;
    taxes: Tax[];
    totalTax: MoneyAmount;
    totalShipping: MoneyAmount;
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
};
export type OrderDetails = {
    status: string;
    token: string;
    carrier: string;
    email: string;
    id: string;
    number: string;
    orderDate: string;
    items: OrderItem[];
    shipments: ShipmentsModel[];
    paymentMethods: PaymentMethod[];
    shippingAddress: CustomerAddressesModel;
    billingAddress: CustomerAddressesModel;
    total: OrderTotals;
};
export type PaginationInfo = {
    currentPage: number;
    pageSize: number;
    totalPages: number;
};
export interface OrderHistory {
    items: OrderDetails[];
    pageInfo: PaginationInfo;
    totalCount: number;
    dateOfFirstOrder: string;
}
//# sourceMappingURL=order-history-list.d.ts.map