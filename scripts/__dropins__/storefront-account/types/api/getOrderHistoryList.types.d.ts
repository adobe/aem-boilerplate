import { UserAddressesProps } from '..';

export interface PaymentMethodProps {
    name: string;
}
export interface ProductProps {
    sku: string;
    url_key: string;
    small_image: {
        url: string;
    };
}
export interface OrderItemProps {
    quantity_ordered?: number;
    quantity_shipped?: number;
    quantity_invoiced?: number;
    url_key: string;
    sku: string;
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
    grand_total_excl_tax: AmountProps;
    subtotal: AmountProps;
    taxes: TaxProps[];
    total_tax: AmountProps;
    total_shipping: AmountProps;
    discounts: DiscountProps[];
    total_giftcard: AmountProps;
    subtotal_excl_tax: AmountProps;
    subtotal_incl_tax: AmountProps;
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
    returns?: ReturnProps[];
    total: TotalProps;
    status: string;
    id: string;
    payment_method?: PaymentMethodProps[];
    shipments?: [];
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
export interface ReturnsProps {
    items: ReturnProps[];
}
export interface ReturnProps {
    uid: string;
    number: string;
    order: {
        id: string;
    };
}
export interface OrderHistoryListResponse {
    data: {
        customer?: {
            orders: OrdersProps;
            returns: ReturnsProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getOrderHistoryList.types.d.ts.map