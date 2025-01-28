/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2024 Adobe
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
export type QueryType = 'orderData';
export interface UserAddressesProps {
    city?: string;
    company?: string;
    country_code?: string;
    fax?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    postcode?: string;
    prefix?: string;
    region?: string;
    region_id?: number;
    street?: string[];
    suffix?: string;
    telephone?: string;
    vat_id?: string;
}
interface ThumbnailImageProps {
    url?: string;
    label?: string;
}
export interface ProductProps {
    only_x_left_in_stock?: number;
    stock_status?: string;
    thumbnail?: ThumbnailImageProps;
    image: ThumbnailImageProps;
    canonical_url: string;
    url_key: string;
    id: string;
    uid: string;
    name: string;
    __typename: string;
    sku: string;
    price_range: {
        maximum_price: {
            regular_price: MoneyProps;
        };
    };
}
export interface MoneyProps {
    value: number;
    currency: string;
}
interface GrandTotalProps extends MoneyProps {
}
interface SubtotalProps extends MoneyProps {
}
interface TotalTaxProps extends MoneyProps {
}
interface TaxAmountProps extends MoneyProps {
}
interface TotalShippingProps extends MoneyProps {
}
interface TaxDetailProps {
    amount?: TaxAmountProps;
    rate?: number;
    title?: string;
}
export interface DiscountProps {
    amount: MoneyProps;
    label: string;
}
export interface TotalProps {
    total_giftcard?: MoneyProps;
    grand_total?: GrandTotalProps;
    subtotal?: SubtotalProps;
    taxes?: TaxDetailProps[];
    total_tax?: TotalTaxProps;
    total_shipping?: TotalShippingProps;
    discounts?: DiscountProps[];
}
interface InvoiceItemInterface {
}
interface InvoiceProps {
    id?: string;
    number?: string;
    total?: TotalProps;
    items?: InvoiceItemInterface[];
    comments?: {
        message: string;
        timestamp: string;
    }[];
}
export interface GiftMessageProps {
    form: string;
    message: string;
    to: string;
}
export interface GiftWrappingProps {
    gift_wrapping: {
        design: string;
        price: MoneyProps;
        uid: string;
        image: {
            url: string;
            label: string;
        };
    };
}
export interface giftCardProps {
    sender_name: string;
    sender_email: string;
    recipient_email: string;
    recipient_name: string;
    message: string;
}
export interface OrderItemProps {
    __typename: string;
    discounts: DiscountProps[];
    eligible_for_return: boolean;
    entered_options: {
        label: string;
        value: string;
    }[];
    gift_message: GiftMessageProps;
    gift_wrapping: GiftWrappingProps;
    id: string;
    product: ProductProps;
    product_name: string;
    product_sale_price: MoneyProps;
    product_sku: string;
    product_type: string;
    product_url_key: string;
    quantity_canceled: number;
    quantity_invoiced: number;
    quantity_ordered: number;
    quantity_refunded: number;
    quantity_returned: number;
    quantity_shipped: number;
    quantity_return_requested: number;
    selected_options: {
        label: string;
        value: string;
    }[];
    bundle_options: any;
    status: string;
    gift_card?: giftCardProps;
    downloadable_links: {
        title: string;
    }[];
    prices: {
        price_including_tax: MoneyProps;
        original_price: MoneyProps;
        original_price_including_tax: MoneyProps;
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
}
export interface PaymentMethodsProps {
    name: string;
    type: string;
    additional_data: {
        name: string;
        value: string;
    }[];
}
export interface ShipmentsProps {
    id: string;
    number: string;
    tracking: {
        carrier: string;
        number: string;
        title: string;
    }[];
    comments: {
        message: string;
        timestamp: string;
    }[];
    items: {
        id: string;
        product_sku: string;
        product_name: string;
        quantity_shipped: number;
        order_item: OrderItemProps;
    }[];
}
export declare enum AvailableActionsProps {
    CANCEL = "CANCEL",
    RETURN = "RETURN",
    REORDER = "REORDER"
}
export interface ReturnsItemsProps {
    number: string;
    status: string;
    created_at: string;
    order: {
        number: string;
        token: string;
    };
    shipping: {
        tracking: {
            status: {
                text: string;
                type: string;
            };
            carrier: {
                uid: string;
                label: string;
            };
            tracking_number: string;
        }[];
    };
    items: {
        quantity: number;
        status: string;
        uid: string;
        request_quantity: number;
        order_item: OrderItemProps;
    }[];
}
export interface OrderProps {
    is_virtual?: boolean;
    order_status_change_date?: string;
    available_actions: AvailableActionsProps[];
    shipping_method: string;
    status: string;
    token: string;
    carrier: string;
    email: string;
    gift_receipt_included: boolean;
    id: string;
    number: string;
    order_date: string;
    printed_card_included: boolean;
    applied_coupons: {
        code: string;
    }[];
    returns: {
        __typename: string;
        items: ReturnsItemsProps[];
    };
    shipments: ShipmentsProps[];
    items_eligible_for_return: OrderItemProps[];
    items: OrderItemProps[];
    gift_wrapping: GiftWrappingProps;
    gift_message: GiftMessageProps;
    payment_methods: PaymentMethodsProps[];
    invoices: InvoiceProps[];
    shipping_address: UserAddressesProps;
    billing_address: UserAddressesProps;
    total?: TotalProps;
}
export interface ErrorProps {
    errors?: {
        message?: string;
    }[];
}
type GetOrderDetailsByParams<T extends QueryType> = {
    orderId?: string;
    returnRef?: string;
    queryType: T;
    returnsPageSize?: number;
};
export interface GetOrderDetailsByIdProps extends GetOrderDetailsByParams<QueryType> {
}
export interface OrdersResponse extends ErrorProps {
    data?: {
        customer?: {
            orders?: {
                items?: OrderProps[];
            };
        };
    };
}
export interface OrderByNumberResponse extends OrdersResponse {
}
export type ResponseData<T extends QueryType> = T extends 'orderData' | 'orderSummary' | 'orderStatus' ? OrderByNumberResponse : never;
export {};
//# sourceMappingURL=getOrderDetails.types.d.ts.map