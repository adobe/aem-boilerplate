/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
export declare const mockOrdersListResponse: {
    customer: {
        orders: {
            page_info: {
                page_size: number;
                total_pages: number;
                current_page: number;
            };
            total_count: number;
            date_of_first_order: string;
            items: ({
                token: string;
                email: string;
                shipping_method: string;
                shipping_address: {
                    firstname: string;
                    lastname: string;
                    city: string;
                    company: string;
                    country_code: string;
                    region: {
                        region: string;
                        region_code: string;
                        region_id: string;
                    };
                    telephone: string;
                    id: string;
                    vat_id: string;
                    postcode: string;
                    street: string[];
                    default_shipping: boolean;
                    default_billing: boolean;
                    custom_attributesV2: never[];
                };
                billing_address: {
                    firstname: string;
                    lastname: string;
                    city: string;
                    company: string;
                    country_code: string;
                    region: {
                        region: string;
                        region_code: string;
                        region_id: string;
                    };
                    telephone: string;
                    id: string;
                    vat_id: string;
                    postcode: string;
                    street: string[];
                    default_shipping: boolean;
                    default_billing: boolean;
                    custom_attributesV2: never[];
                };
                payment_methods: {
                    name: string;
                }[];
                number: string;
                id: string;
                order_date: string;
                carrier: string;
                status: string;
                items: {
                    status: string;
                    product_name: string;
                    id: string;
                    product: {
                        small_image: {
                            url: string;
                        };
                    };
                }[];
                total: {
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                    subtotal: {
                        currency: string;
                        value: number;
                    };
                    taxes: never[];
                    total_tax: {
                        currency: string;
                        value: number;
                    };
                    total_shipping: {
                        currency: string;
                        value: number;
                    };
                    discounts: never[];
                };
                shipments?: undefined;
                quantityInvoiced?: undefined;
            } | {
                token: string;
                email: string;
                shipping_method: string;
                shipments: {
                    id: string;
                    tracking: {
                        title: string;
                        number: string;
                        carrier: string;
                    }[];
                }[];
                shipping_address: {
                    firstname: string;
                    lastname: string;
                    city: string;
                    company: string;
                    country_code: string;
                    region: {
                        region: string;
                        region_code: string;
                        region_id: string;
                    };
                    telephone: string;
                    id: string;
                    vat_id: string;
                    postcode: string;
                    street: string[];
                    default_shipping: boolean;
                    default_billing: boolean;
                    custom_attributesV2: never[];
                };
                billing_address: {
                    firstname: string;
                    lastname: string;
                    city: string;
                    company: string;
                    country_code: string;
                    region: {
                        region: string;
                        region_code: string;
                        region_id: string;
                    };
                    telephone: string;
                    id: string;
                    vat_id: string;
                    postcode: string;
                    street: string[];
                    default_shipping: boolean;
                    default_billing: boolean;
                    custom_attributesV2: never[];
                };
                payment_methods: {
                    name: string;
                }[];
                number: string;
                quantityInvoiced: number;
                id: string;
                order_date: string;
                carrier: string;
                status: string;
                items: ({
                    status: string;
                    quantityOrdered: number;
                    product_name: undefined;
                    id: string;
                    product: {
                        small_image: {
                            url: string;
                        };
                    };
                    quantityInvoiced?: undefined;
                } | {
                    status: string;
                    quantityOrdered: number;
                    quantityInvoiced: number;
                    product_name: string;
                    id: string;
                    product: {
                        small_image: {
                            url: string;
                        };
                    };
                } | {
                    status: string;
                    quantityOrdered: number;
                    product_name: string;
                    id: string;
                    product: {
                        small_image: {
                            url: string;
                        };
                    };
                    quantityInvoiced?: undefined;
                })[];
                total: {
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                    subtotal: {
                        currency: string;
                        value: number;
                    };
                    taxes: never[];
                    total_tax: {
                        currency: string;
                        value: number;
                    };
                    total_shipping: {
                        currency: string;
                        value: number;
                    };
                    discounts: never[];
                };
            })[];
        };
    };
};
//# sourceMappingURL=mockOrdersList.config.d.ts.map