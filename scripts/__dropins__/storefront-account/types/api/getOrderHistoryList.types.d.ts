import { UserAddressesProps } from '..';

export interface PaymentMethodProps {
    name: string;
}
export interface ProductProps {
    small_image: {
        url: string;
    };
}
export interface OrderItemProps {
    quantity_ordered?: number;
    quantity_shipped?: number;
    quantity_invoiced?: number;
    status: string;
    product_name: string;
    id: string;
    product: ProductProps;
}
export interface AmountProps {
    value: number;
    currency: string;
}
export interface TaxProps {
    amount: AmountProps;
    rate: number;
    title: string;
}
export interface DiscountProps {
    amount: AmountProps;
    label: string;
}
export interface TotalProps {
    grand_total: AmountProps;
    subtotal: AmountProps;
    taxes: TaxProps[];
    total_tax: AmountProps;
    total_shipping: AmountProps;
    discounts: DiscountProps[];
}
export interface OrderProps {
    token: string;
    email: string;
    shipping_method: string;
    shipping_address: UserAddressesProps;
    billing_address: UserAddressesProps;
    payment_methods: PaymentMethodProps[];
    number: string;
    order_date: string;
    carrier: string;
    items: OrderItemProps[];
    total: TotalProps;
    status: string;
    id: string;
}
export interface PageInfoProps {
    page_size: number;
    total_pages: number;
    current_page: number;
}
export interface OrdersProps {
    page_info: PageInfoProps;
    total_count: number;
    items: OrderProps[];
    date_of_first_order: string;
}
export interface OrderHistoryListResponse {
    data: {
        customer?: {
            orders: OrdersProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getOrderHistoryList.types.d.ts.map