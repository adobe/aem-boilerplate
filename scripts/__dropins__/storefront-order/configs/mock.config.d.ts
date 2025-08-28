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
export declare const totalGiftOptions: {
    giftWrappingForItems: {
        value: number;
        currency: string;
    };
    giftWrappingForItemsInclTax: {
        value: number;
        currency: string;
    };
    giftWrappingForOrder: {
        value: number;
        currency: string;
    };
    giftWrappingForOrderInclTax: {
        value: number;
        currency: string;
    };
    printedCard: {
        value: number;
        currency: string;
    };
    printedCardInclTax: {
        value: number;
        currency: string;
    };
};
export declare const gift_options: {
    gift_wrapping_for_items: {
        currency: string;
        value: number;
    };
    gift_wrapping_for_items_incl_tax: {
        currency: string;
        value: number;
    };
    gift_wrapping_for_order: {
        currency: string;
        value: number;
    };
    gift_wrapping_for_order_incl_tax: {
        currency: string;
        value: number;
    };
    printed_card: {
        currency: string;
        value: number;
    };
    printed_card_incl_tax: {
        currency: string;
        value: number;
    };
};
export declare const taxCalculations: {
    includeAndExcludeTax: {
        originalPrice: {
            value: number;
            currency: string;
        };
        baseOriginalPrice: {
            value: number;
            currency: string;
        };
        baseDiscountedPrice: {
            value: number;
            currency: string;
        };
        baseExcludingTax: {
            value: number;
            currency: string;
        };
    };
    excludeTax: {
        originalPrice: {
            value: number;
            currency: string;
        };
        baseOriginalPrice: {
            value: number;
            currency: string;
        };
        baseDiscountedPrice: {
            value: number;
            currency: string;
        };
        baseExcludingTax: {
            value: number;
            currency: string;
        };
    };
    includeTax: {
        singleItemPrice: {
            value: number;
            currency: string;
        };
        baseOriginalPrice: {
            value: number;
            currency: string;
        };
        baseDiscountedPrice: {
            value: number;
            currency: string;
        };
    };
};
export declare const taxCalculationsEmpty: {
    includeAndExcludeTax: {
        originalPrice: {
            value: number;
            currency: string;
        };
        baseOriginalPrice: {
            value: number;
            currency: string;
        };
        baseDiscountedPrice: {
            value: number;
            currency: string;
        };
        baseExcludingTax: {
            value: number;
            currency: string;
        };
    };
    excludeTax: {
        originalPrice: {
            value: number;
            currency: string;
        };
        baseOriginalPrice: {
            value: number;
            currency: string;
        };
        baseDiscountedPrice: {
            value: number;
            currency: string;
        };
        baseExcludingTax: {
            value: number;
            currency: string;
        };
    };
    includeTax: {
        singleItemPrice: {
            value: number;
            currency: string;
        };
        baseOriginalPrice: {
            value: number;
            currency: string;
        };
        baseDiscountedPrice: {
            value: number;
            currency: string;
        };
    };
};
export declare const mockOrder: {
    data: {
        guestOrder: {
            gift_receipt_included: boolean;
            carrier: string;
            email: string;
            id: string;
            number: string;
            order_date: string;
            printed_card_included: boolean;
            shipping_method: string;
            status: string;
            token: string;
            payment_methods: {
                name: string;
                type: string;
            }[];
            total: {
                subtotal: {
                    currency: string;
                    value: number;
                };
                total_tax: {
                    currency: string;
                    value: number;
                };
                total_shipping: {
                    currency: string;
                    value: number;
                };
                grand_total: {
                    currency: string;
                    value: number;
                };
            };
            billing_address: {
                firstname: string;
                middlename: null;
                lastname: string;
                street: string[];
                city: string;
                postcode: string;
                telephone: string;
                country_code: string;
                region: string;
                region_id: string;
                company: string;
            };
            shipping_address: {
                firstname: string;
                middlename: null;
                lastname: string;
                street: string[];
                city: string;
                postcode: string;
                telephone: string;
                country_code: string;
                region: string;
                region_id: string;
                company: string;
            };
            items: {
                __typename: string;
                id: string;
                quantity_ordered: number;
                product_sale_price: {
                    value: number;
                    currency: string;
                };
                product: {
                    name: string;
                    sku: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    price_range: {
                        maximum_price: {
                            regular_price: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                };
                selected_options: {
                    label: string;
                    value: string;
                }[];
            }[];
        };
    };
};
export declare const mockOrderDetailsResponse: {
    customer: {
        addresses: {
            firstname: string;
            lastname: string;
            city: string;
            company: string;
            country_code: string;
            region: {
                region: string;
                region_code: string;
                region_id: number;
            };
            custom_attributesV2: never[];
            telephone: string;
            id: number;
            vat_id: string;
            postcode: string;
            street: string[];
            default_shipping: boolean;
            default_billing: boolean;
        }[];
        orders: {
            page_info: {
                page_size: number;
                total_pages: number;
                current_page: number;
            };
            total_count: number;
            items: {
                shipping_method: string;
                payment_methods: {
                    name: string;
                }[];
                number: string;
                id: string;
                order_date: string;
                carrier: string;
                items: {
                    status: string;
                    product_name: string;
                    id: string;
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
            }[];
        };
    };
};
export declare const transformMockOrderInput: {
    data: {
        customer: {
            orders: {
                items: {
                    uid: string;
                    available_actions: string[];
                    status: string;
                    number: string;
                    token: string;
                    id: string;
                    order_date: string;
                    carrier: string;
                    shipping_method: null;
                    applied_coupons: never[];
                    payment_methods: {
                        test: null;
                        prop: undefined;
                    }[];
                    returns: {
                        status: string;
                        number: string;
                        items: never[];
                    }[];
                    shipments: {
                        id: string;
                        tracking: {
                            title: string;
                            number: string;
                        }[];
                        comments: never[];
                        items: {
                            id: string;
                            product_sku: string;
                            product_name: string;
                            order_item: {
                                __typename: string;
                                status: string;
                                product_name: string;
                                id: string;
                                quantity_ordered: number;
                                quantity_shipped: number;
                                quantity_canceled: number;
                                quantity_invoiced: number;
                                quantity_refunded: number;
                                quantity_returned: number;
                                product_sale_price: {
                                    value: number;
                                    currency: string;
                                };
                                selected_options: {
                                    label: string;
                                    value: string;
                                }[];
                                product: {
                                    __typename: string;
                                    canonical_url: null;
                                    uid: string;
                                    name: string;
                                    sku: string;
                                    thumbnail: {
                                        label: string;
                                        url: string;
                                    };
                                    price_range: {
                                        maximum_price: {
                                            regular_price: {
                                                currency: string;
                                                value: number;
                                            };
                                        };
                                    };
                                };
                            };
                        }[];
                    }[];
                    shipping_address: {
                        city: string;
                        company: null;
                        country_code: string;
                        fax: null;
                        firstname: string;
                        lastname: string;
                        middlename: null;
                        postcode: string;
                        prefix: null;
                        region: string;
                        region_id: string;
                        street: string[];
                        suffix: null;
                        telephone: string;
                        vat_id: null;
                    };
                    billing_address: {
                        city: string;
                        company: null;
                        country_code: string;
                        fax: null;
                        firstname: string;
                        lastname: string;
                        middlename: null;
                        postcode: string;
                        prefix: null;
                        region: string;
                        region_id: string;
                        street: string[];
                        suffix: null;
                        telephone: string;
                        vat_id: null;
                    };
                    items: ({
                        __typename: string;
                        gift_card: {
                            sender_name: null;
                            sender_email: null;
                            recipient_email: null;
                            recipient_name: null;
                        };
                        status?: undefined;
                        product_name?: undefined;
                        id?: undefined;
                        quantity_ordered?: undefined;
                        quantity_shipped?: undefined;
                        quantity_canceled?: undefined;
                        quantity_invoiced?: undefined;
                        quantity_refunded?: undefined;
                        quantity_returned?: undefined;
                        product_sale_price?: undefined;
                        selected_options?: undefined;
                        product?: undefined;
                    } | {
                        __typename: string;
                        gift_card: {
                            sender_name: string;
                            sender_email: string;
                            recipient_email: string;
                            recipient_name: string;
                        };
                        status?: undefined;
                        product_name?: undefined;
                        id?: undefined;
                        quantity_ordered?: undefined;
                        quantity_shipped?: undefined;
                        quantity_canceled?: undefined;
                        quantity_invoiced?: undefined;
                        quantity_refunded?: undefined;
                        quantity_returned?: undefined;
                        product_sale_price?: undefined;
                        selected_options?: undefined;
                        product?: undefined;
                    } | {
                        __typename: string;
                        status: string;
                        product_name: string;
                        id: string;
                        quantity_ordered: number;
                        quantity_shipped: number;
                        quantity_canceled: number;
                        quantity_invoiced: number;
                        quantity_refunded: number;
                        quantity_returned: number;
                        product_sale_price: {
                            value: number;
                            currency: string;
                        };
                        selected_options: {
                            label: string;
                            value: string;
                        }[];
                        product: {
                            __typename: string;
                            canonical_url: null;
                            uid: string;
                            name: string;
                            sku: string;
                            thumbnail: {
                                label: string;
                                url: string;
                            };
                            price_range: {
                                maximum_price: {
                                    regular_price: {
                                        currency: string;
                                        value: number;
                                    };
                                };
                            };
                        };
                        gift_card?: undefined;
                    })[];
                    total: {
                        gift_options: {
                            gift_wrapping_for_items: {
                                currency: string;
                                value: number;
                            };
                            gift_wrapping_for_items_incl_tax: {
                                currency: string;
                                value: number;
                            };
                            gift_wrapping_for_order: {
                                currency: string;
                                value: number;
                            };
                            gift_wrapping_for_order_incl_tax: {
                                currency: string;
                                value: number;
                            };
                            printed_card: {
                                currency: string;
                                value: number;
                            };
                            printed_card_incl_tax: {
                                currency: string;
                                value: number;
                            };
                        };
                        grand_total: {
                            value: number;
                            currency: string;
                        };
                        grand_total_excl_tax: {
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
                        discounts: {
                            amount: {
                                currency: string;
                                value: number;
                            };
                            label: string;
                        }[];
                    };
                }[];
            };
        };
    };
};
export declare const transformMockOrderOutput: {
    grandTotal: {
        value: number;
        currency: string;
    };
    subtotal: {
        currency: string;
        value: number;
    };
    taxes: never[];
    totalTax: {
        currency: string;
        value: number;
    };
    totalShipping: {
        currency: string;
        value: number;
    };
    discounts: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    availableActions: string[];
    status: string;
    number: string;
    email: string;
    id: string;
    orderDate: string;
    carrier: string;
    shippingMethod: null;
    coupons: never[];
    shipments: ({
        id: string;
        tracking: {
            title: string;
            number: string;
        }[];
        comments: never[];
        items: {
            taxCalculations: {
                includeAndExcludeTax: {
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                    baseExcludingTax: {
                        value: number;
                        currency: string;
                    };
                };
                excludeTax: {
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                    baseExcludingTax: {
                        value: number;
                        currency: string;
                    };
                };
                includeTax: {
                    singleItemPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                };
            };
            id: string;
            productSku: string;
            productName: string;
            orderItem: {
                __typename: string;
                status: string;
                productName: string;
                id: string;
                quantityOrdered: number;
                quantityShipped: number;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityRefunded: number;
                quantityReturned: number;
                productSalePrice: {
                    value: number;
                    currency: string;
                };
                selectedOptions: never[];
                product: {
                    __typename: string;
                    canonicalUrl: null;
                    uid: string;
                    name: string;
                    sku: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                };
            };
        }[];
    } | {
        id: string;
        tracking: {
            title: string;
            number: string;
        }[];
        comments: never[];
        items: {
            id: string;
            productSku: string;
            productName: string;
            orderItem: {
                __typename: string;
                status: string;
                productName: string;
                id: string;
                quantityOrdered: number;
                quantityShipped: number;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityRefunded: number;
                quantityReturned: number;
                productSalePrice: {
                    value: number;
                    currency: string;
                };
                selectedOptions: {
                    label: string;
                    value: string;
                }[];
                product: {
                    __typename: string;
                    canonicalUrl: null;
                    uid: string;
                    name: string;
                    sku: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                };
            };
        }[];
    })[];
    shippingAddress: {
        city: string;
        company: null;
        countryCode: string;
        fax: null;
        firstName: string;
        lastName: string;
        middleName: null;
        postCode: string;
        prefix: null;
        region: string;
        regionId: string;
        street: string[];
        suffix: null;
        telephone: string;
        vatId: null;
    };
    billingAddress: {
        city: string;
        company: null;
        countryCode: string;
        fax: null;
        firstName: string;
        lastName: string;
        middleName: null;
        postCode: string;
        prefix: null;
        region: string;
        regionId: string;
        street: string[];
        suffix: null;
        telephone: string;
        vatId: null;
    };
    items: ({
        type: string;
        configurableOptions: undefined;
        discounted: boolean;
        total: {
            currency: undefined;
            value: number;
        };
        totalInclTax: {
            currency: undefined;
            value: number;
        };
        price: {
            currency: undefined;
            value: undefined;
        };
        priceInclTax: {
            currency: undefined;
            value: undefined;
        };
        totalQuantity: number;
        regularPrice: {
            currency: undefined;
            value: undefined;
        };
        product: {
            canonicalUrl: string;
            id: string;
            name: string;
            sku: string;
            image: string;
            productType: string;
            thumbnail: {
                label: string;
                url: string;
            };
        };
        thumbnail: {
            label: string;
            url: string;
        };
        giftCard: {
            senderName: string;
            senderEmail: string;
            recipientEmail: string;
            recipientName: string;
        };
        id: undefined;
        selectedOptions?: undefined;
    } | {
        type: string;
        id: string;
        giftCard: undefined;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            canonicalUrl: string;
            id: string;
            name: string;
            sku: string;
            image: string;
            productType: string;
            thumbnail: {
                label: string;
                url: string;
            };
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Size?: undefined;
            Color?: undefined;
        };
        selectedOptions?: undefined;
    } | {
        type: string;
        id: string;
        giftCard: undefined;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        selectedOptions: {
            label: string;
            value: string;
        }[];
        product: {
            canonicalUrl: string;
            id: string;
            name: string;
            sku: string;
            image: string;
            productType: string;
            thumbnail: {
                label: string;
                url: string;
            };
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Size?: undefined;
            Color?: undefined;
        };
    } | {
        type: string;
        id: string;
        giftCard: undefined;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            canonicalUrl: string;
            id: string;
            name: string;
            sku: string;
            image: string;
            productType: string;
            thumbnail: {
                label: string;
                url: string;
            };
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Size: string;
            Color: string;
        };
        selectedOptions?: undefined;
    })[];
    totalQuantity: number;
    shipping: {
        amount: number;
        currency: string;
        code: string;
    };
    payments: {
        code: string;
        name: string;
    }[];
};
export declare const storyBookOrderData: {
    grandTotal: {
        value: number;
        currency: string;
    };
    subtotal: {
        currency: string;
        value: number;
    };
    taxes: never[];
    totalTax: {
        currency: string;
        value: number;
    };
    totalShipping: {
        currency: string;
        value: number;
    };
    discounts: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    availableActions: string[];
    status: string;
    number: string;
    id: string;
    orderDate: string;
    carrier: string;
    shippingMethod: string;
    isVirtual: boolean;
    coupons: never[];
    shipments: {
        id: string;
        number: string;
        tracking: {
            title: string;
            number: string;
            carrier: string;
        }[];
        comments: never[];
        items: {
            id: string;
            productSku: string;
            productName: string;
            orderItem: {
                __typename: string;
                status: string;
                productName: string;
                id: string;
                quantityOrdered: number;
                quantityShipped: number;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityRefunded: number;
                quantityReturned: number;
                productSalePrice: {
                    value: number;
                    currency: string;
                };
                selectedOptions: never[];
                product: {
                    __typename: string;
                    canonicalUrl: null;
                    uid: string;
                    name: string;
                    sku: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                };
            };
        }[];
    }[];
    payments: {
        code: string;
        name: string;
    }[];
    shippingAddress: {
        city: string;
        company: null;
        countryCode: string;
        fax: null;
        firstName: string;
        lastName: string;
        middleName: null;
        postCode: string;
        prefix: null;
        region: string;
        regionId: string;
        street: string[];
        suffix: null;
        telephone: string;
        vatId: null;
    };
    billingAddress: {
        city: string;
        company: null;
        countryCode: string;
        fax: null;
        firstName: string;
        lastName: string;
        middleName: null;
        postCode: string;
        prefix: null;
        region: string;
        regionId: string;
        street: string[];
        suffix: null;
        telephone: string;
        vatId: null;
    };
    items: ({
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            canonicalUrl: string;
            id: string;
            name: string;
            sku: string;
            image: string;
            productType: string;
            thumbnail: {
                label: string;
                url: string;
            };
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Size?: undefined;
            Color?: undefined;
        };
    } | {
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            canonicalUrl: string;
            id: string;
            name: string;
            sku: string;
            image: string;
            productType: string;
            thumbnail: {
                label: string;
                url: string;
            };
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Size: string;
            Color: string;
        };
    })[];
    totalQuantity: number;
    shipping: {
        amount: number;
        currency: string;
        code: string;
    };
};
export declare const storyBookShortOrderData: any;
export declare const storyBookNormalizeAddress: {
    billingAddress: ({
        name: string;
        orderNumber: number;
        value: string;
        label: null;
    }[] | {
        name: string;
        orderNumber: number;
        value: string[];
        label: null;
    }[])[];
    shippingAddress: ({
        name: string;
        orderNumber: number;
        value: string;
        label: null;
    }[] | {
        name: string;
        orderNumber: number;
        value: string[];
        label: null;
    }[])[];
};
export declare const orderCostSummaryMockup: {
    number: string;
    email: string;
    token: string;
    status: string;
    isVirtual: boolean;
    totalQuantity: number;
    shippingMethod: string;
    carrier: string;
    appliedGiftCards: {
        appliedBalance: {
            currency: string;
            value: number;
        };
        code: string;
    }[];
    discounts: {
        amount: {
            value: number;
            currency: string;
        };
        label: string;
    }[];
    coupons: {
        code: string;
    }[];
    payments: {
        code: string;
        name: string;
    }[];
    shipping: {
        code: string;
        amount: number;
        currency: string;
    };
    shipments: {
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
            productSku: string;
            productName: string;
            orderItem: {
                id: string;
                type: string;
                discounted: boolean;
                productName: string;
                totalQuantity: number;
                price: {
                    value: number;
                    currency: string;
                };
                totalInclTax: {};
                priceInclTax: {};
                regularPrice: {
                    value: number;
                    currency: string;
                };
                total: {
                    value: number;
                    currency: string;
                };
                configurableOptions: {};
                product: {
                    id: string;
                    name: string;
                    productType: string;
                    sku: string;
                    thumbnail: {
                        url: string;
                        label: string;
                    };
                };
                thumbnail: {
                    url: string;
                    label: string;
                };
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityOrdered: number;
                quantityRefunded: number;
                quantityReturned: number;
                quantityShipped: number;
            };
        }[];
    }[];
    items: {
        id: string;
        type: string;
        discounted: boolean;
        productName: string;
        totalQuantity: number;
        price: {
            value: number;
            currency: string;
        };
        totalInclTax: {};
        priceInclTax: {};
        regularPrice: {
            value: number;
            currency: string;
        };
        total: {
            value: number;
            currency: string;
        };
        configurableOptions: {};
        product: {
            id: string;
            name: string;
            productType: string;
            sku: string;
            thumbnail: {
                url: string;
                label: string;
            };
        };
        thumbnail: {
            url: string;
            label: string;
        };
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
    }[];
    totalGiftOptions: {
        giftWrappingForItems: {
            value: number;
            currency: string;
        };
        giftWrappingForItemsInclTax: {
            value: number;
            currency: string;
        };
        giftWrappingForOrder: {
            value: number;
            currency: string;
        };
        giftWrappingForOrderInclTax: {
            value: number;
            currency: string;
        };
        printedCard: {
            value: number;
            currency: string;
        };
        printedCardInclTax: {
            value: number;
            currency: string;
        };
    };
    totalGiftCard: {
        value: number;
        currency: string;
    };
    grandTotal: {
        value: number;
        currency: string;
    };
    totalShipping: {
        value: number;
        currency: string;
    };
    subtotal: {
        value: number;
        currency: string;
    };
    totalTax: {
        value: number;
        currency: string;
    };
    shippingAddress: {
        street: string[];
        city: string;
        country: string;
        company: string;
        firstName: string;
        middleName: string;
        lastName: string;
        postCode: string;
        region: string;
        regionId: string;
        telephone: string;
        customAttributes: never[];
    };
    billingAddress: {
        street: string[];
        city: string;
        company: string;
        country: string;
        firstName: string;
        middleName: string;
        lastName: string;
        postCode: string;
        region: string;
        regionId: string;
        telephone: string;
        customAttributes: never[];
    };
    availableActions: never[];
};
export declare const orderMockOrderProductItemsList: {
    items: ({
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            discounts?: undefined;
        };
        downloadableLinks: {
            count: number;
            result: string;
        };
        giftCard?: undefined;
    } | {
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color: string;
            Size: string;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            discounts: {
                label: string;
                amount: {
                    value: number;
                };
            }[];
        };
        downloadableLinks?: undefined;
        giftCard?: undefined;
    } | {
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            discounts: {
                label: string;
                amount: {
                    value: number;
                };
            }[];
        };
        downloadableLinks?: undefined;
        giftCard?: undefined;
    } | {
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: {
            'Sprite Foam Yoga Brick': string;
            'Sprite Foam Roller': string;
            'Sprite Stasis Ball': string;
            'Sprite Yoga Strap': string;
        };
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            discounts: {
                label: string;
                amount: {
                    value: number;
                };
            }[];
        };
        downloadableLinks?: undefined;
        giftCard?: undefined;
    } | {
        type: string;
        productName: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        giftCard: {
            senderName: string;
            senderEmail: string;
            recipientEmail: string;
            recipientName: string;
            message: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            discounts: {
                label: string;
                amount: {
                    value: number;
                };
            }[];
        };
        downloadableLinks?: undefined;
    })[];
    totalQuantity: number;
};
export declare const returnOrderListMockResponse: {
    customer: {
        returns: {
            page_info: {
                page_size: number;
                total_pages: number;
                current_page: number;
            };
            items: {
                number: string;
                shipping: {
                    tracking: {
                        status: null;
                        carrier: {
                            uid: string;
                            label: string;
                        };
                        tracking_number: string;
                    }[];
                };
                order: {
                    number: string;
                    token: string;
                };
                items: {
                    uid: string;
                    quantity: number;
                    status: string;
                    request_quantity: number;
                    order_item: {
                        __typename: string;
                        status: string;
                        product_name: string;
                        id: string;
                        quantity_ordered: number;
                        quantity_shipped: number;
                        quantity_canceled: number;
                        quantity_invoiced: number;
                        quantity_refunded: number;
                        quantity_returned: number;
                        product_sale_price: {
                            value: number;
                            currency: string;
                        };
                        selected_options: never[];
                        product: {
                            __typename: string;
                            canonical_url: null;
                            uid: string;
                            name: string;
                            sku: string;
                            thumbnail: {
                                label: string;
                                url: string;
                            };
                            price_range: {
                                maximum_price: {
                                    regular_price: {
                                        currency: string;
                                        value: number;
                                    };
                                };
                            };
                        };
                    };
                }[];
            }[];
        };
    };
};
export declare const returnOrderListMock: {
    token: string;
    orderNumber: string;
    items: {
        uid: string;
        quantity: number;
        status: string;
        requestQuantity: number;
        orderItem: {
            type: string;
            productName: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                canonicalUrl: string;
                id: string;
                name: string;
                sku: string;
                image: string;
                productType: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {};
        };
    }[];
    tracking: {
        status: null;
        carrier: {
            uid: string;
            label: string;
        };
        trackingNumber: string;
    }[];
}[];
export declare const translationsOrderCostSummaryMock: {
    headerText: string;
    subtotal: string;
    shipping: string;
    freeShipping: string;
    tax: string;
    incl: string;
    excl: string;
    discount: string;
    discountSubtitle: string;
    total: string;
};
export declare const createReturnOrderMock: {
    grandTotal: {
        value: number;
        currency: string;
    };
    totalGiftCard: {
        currency: string;
        value: number;
    };
    subtotal: {
        currency: string;
        value: number;
    };
    taxes: {
        amount: {
            currency: string;
            value: number;
        };
        rate: number;
        title: string;
    }[];
    totalTax: {
        currency: string;
        value: number;
    };
    totalShipping: {
        currency: string;
        value: number;
    };
    discounts: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    email: string;
    availableActions: string[];
    status: string;
    number: string;
    id: string;
    orderDate: string;
    orderStatusChangeDate: string;
    carrier: string;
    shippingMethod: string;
    isVirtual: boolean;
    returns: ({
        createdReturnAt: string;
        returnStatus: string;
        token: string;
        orderNumber: string;
        returnNumber: string;
        items: ({
            taxCalculations: {
                includeAndExcludeTax: {
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                    baseExcludingTax: {
                        value: number;
                        currency: string;
                    };
                };
                excludeTax: {
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                    baseExcludingTax: {
                        value: number;
                        currency: string;
                    };
                };
                includeTax: {
                    singleItemPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                };
            };
            uid: string;
            quantity: number;
            status: string;
            requestQuantity: number;
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Size: string;
                Color: string;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
        } | {
            uid: string;
            quantity: number;
            status: string;
            requestQuantity: number;
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Size: string;
                Color: string;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
            taxCalculations?: undefined;
        })[];
        tracking: never[];
    } | {
        createdReturnAt: string;
        returnStatus: string;
        token: string;
        orderNumber: string;
        returnNumber: string;
        items: ({
            taxCalculations: {
                includeAndExcludeTax: {
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                    baseExcludingTax: {
                        value: number;
                        currency: string;
                    };
                };
                excludeTax: {
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                    baseExcludingTax: {
                        value: number;
                        currency: string;
                    };
                };
                includeTax: {
                    singleItemPrice: {
                        value: number;
                        currency: string;
                    };
                    baseOriginalPrice: {
                        value: number;
                        currency: string;
                    };
                    baseDiscountedPrice: {
                        value: number;
                        currency: string;
                    };
                };
            };
            uid: string;
            quantity: number;
            status: string;
            requestQuantity: number;
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Color?: undefined;
                Size?: undefined;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
        } | {
            uid: string;
            quantity: number;
            status: string;
            requestQuantity: number;
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Color: string;
                Size: string;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
            taxCalculations?: undefined;
        } | {
            uid: string;
            quantity: number;
            status: string;
            requestQuantity: number;
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Color?: undefined;
                Size?: undefined;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
            taxCalculations?: undefined;
        })[];
        tracking: never[];
    })[];
    itemsEligibleForReturn: ({
        taxCalculations: {
            includeAndExcludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            excludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            includeTax: {
                singleItemPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
            };
        };
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    } | {
        taxCalculations: {
            includeAndExcludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            excludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            includeTax: {
                singleItemPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
            };
        };
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color: string;
            Size: string;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    } | {
        taxCalculations: {
            includeAndExcludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            excludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            includeTax: {
                singleItemPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
            };
        };
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: {
            'Sprite Stasis Ball': string;
            'Sprite Foam Yoga Brick': string;
            'Sprite Yoga Strap': string;
            'Sprite Foam Roller': string;
        };
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    })[];
    coupons: never[];
    shipments: {
        id: string;
        number: string;
        tracking: never[];
        comments: never[];
        items: {
            id: string;
            productSku: string;
            productName: string;
            orderItem: {
                taxCalculations: {
                    includeAndExcludeTax: {
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                        baseExcludingTax: {
                            value: number;
                            currency: string;
                        };
                    };
                    excludeTax: {
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                        baseExcludingTax: {
                            value: number;
                            currency: string;
                        };
                    };
                    includeTax: {
                        singleItemPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                    };
                };
                __typename: string;
                status: string;
                productSku: string;
                eligibleForReturn: boolean;
                productName: string;
                productUrlKey: string;
                id: string;
                quantityOrdered: number;
                quantityShipped: number;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityRefunded: number;
                productSalePrice: {
                    value: number;
                    currency: string;
                };
                selectedOptions: {
                    label: string;
                    value: string;
                }[];
                product: {
                    __typename: string;
                    canonicalUrl: null;
                    urlKey: string;
                    uid: string;
                    name: string;
                    sku: string;
                    onlyXLeftInStock: null;
                    stockStatus: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                };
                prices: {
                    priceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    originalPriceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        }[];
    }[];
    payments: {
        code: string;
        name: string;
    }[];
    shippingAddress: {
        city: string;
        company: null;
        countryCode: string;
        fax: null;
        firstName: string;
        lastName: string;
        middleName: null;
        postCode: string;
        prefix: null;
        region: string;
        regionId: string;
        street: string[];
        suffix: null;
        telephone: string;
        vatId: string;
    };
    billingAddress: {
        city: string;
        company: null;
        countryCode: string;
        fax: null;
        firstName: string;
        lastName: string;
        middleName: null;
        postCode: string;
        prefix: null;
        region: string;
        regionId: string;
        street: string[];
        suffix: null;
        telephone: string;
        vatId: string;
    };
    items: ({
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    } | {
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color: string;
            Size: string;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    } | {
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: {
            'Sprite Stasis Ball': string;
            'Sprite Foam Yoga Brick': string;
            'Sprite Yoga Strap': string;
            'Sprite Foam Roller': string;
        };
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    })[];
    itemsEligibleForReturn2: ({
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    } | {
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color: string;
            Size: string;
        };
        bundleOptions: null;
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    } | {
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: number;
        id: string;
        discounted: boolean;
        total: {
            value: number;
            currency: string;
        };
        totalInclTax: {
            value: number;
            currency: string;
        };
        price: {
            value: number;
            currency: string;
        };
        priceInclTax: {
            value: number;
            currency: string;
        };
        totalQuantity: number;
        regularPrice: {
            value: number;
            currency: string;
        };
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: string;
        };
        configurableOptions: {
            Color?: undefined;
            Size?: undefined;
        };
        bundleOptions: {
            'Sprite Stasis Ball': string;
            'Sprite Foam Yoga Brick': string;
            'Sprite Yoga Strap': string;
            'Sprite Foam Roller': string;
        };
        itemPrices: {
            priceIncludingTax: {
                value: number;
                currency: string;
            };
            originalPrice: {
                value: number;
                currency: string;
            };
            originalPriceIncludingTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
        };
        downloadableLinks: null;
    })[];
    totalQuantity: number;
    shipping: {
        amount: number;
        currency: string;
        code: string;
    };
    returnNumber: string;
};
export declare const shippingStatusCardDataMock: {
    email: string;
    availableActions: string[];
    status: string;
    number: string;
    id: string;
    returns: never[];
    itemsEligibleForReturn: never[];
    coupons: never[];
    shipments: {
        id: string;
        tracking: {
            number: number;
            carrier: string;
            title: string;
        }[];
        comments: never[];
        items: {
            id: string;
            productSku: string;
            productName: string;
            orderItem: {
                __typename: string;
                status: string;
                productSku: string;
                eligibleForReturn: boolean;
                productName: string;
                productUrlKey: string;
                id: string;
                quantityOrdered: number;
                quantityShipped: null;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityRefunded: number;
                quantityReturnRequested: number;
                productSalePrice: {
                    value: number;
                    currency: string;
                };
                selectedOptions: never[];
                product: {
                    __typename: string;
                    canonicalUrl: null;
                    urlKey: string;
                    uid: string;
                    name: string;
                    sku: string;
                    onlyXLeftInStock: null;
                    stockStatus: string;
                    thumbnail: {
                        label: string;
                        url: null;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                };
                prices: {
                    priceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    originalPriceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        }[];
    }[];
    items: {
        type: string;
        eligibleForReturn: boolean;
        productSku: string;
        productName: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturned: number;
        quantityShipped: null;
        quantityReturnRequested: number;
        id: string;
        product: {
            __typename: string;
            canonicalUrl: string;
            urlKey: string;
            uid: string;
            name: string;
            sku: string;
            onlyXLeftInStock: null;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: null;
            };
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            id: string;
            image: string;
            productType: string;
        };
        thumbnail: {
            label: string;
            url: null;
        };
        configurableOptions: {};
        bundleOptions: null;
        downloadableLinks: null;
    }[];
    returnNumber: string;
};
export declare const customerReturnDetailsFullMock: {
    order: {
        grandTotal: {
            value: number;
            currency: string;
        };
        totalGiftCard: {
            currency: string;
            value: number;
        };
        subtotal: {
            currency: string;
            value: number;
        };
        taxes: {
            amount: {
                currency: string;
                value: number;
            };
            rate: number;
            title: string;
        }[];
        totalTax: {
            currency: string;
            value: number;
        };
        totalShipping: {
            currency: string;
            value: number;
        };
        discounts: {
            amount: {
                currency: string;
                value: number;
            };
            label: string;
        }[];
        email: string;
        availableActions: string[];
        status: string;
        number: string;
        id: string;
        orderDate: string;
        orderStatusChangeDate: string;
        carrier: string;
        shippingMethod: string;
        isVirtual: boolean;
        returns: {
            createdReturnAt: string;
            returnStatus: string;
            token: string;
            orderNumber: string;
            returnNumber: string;
            items: ({
                uid: string;
                quantity: number;
                status: string;
                requestQuantity: number;
                type: string;
                eligibleForReturn: boolean;
                productSku: string;
                productName: string;
                productUrlKey: string;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityOrdered: number;
                quantityRefunded: number;
                quantityReturned: number;
                quantityShipped: number;
                quantityReturnRequested: number;
                id: string;
                discounted: boolean;
                total: {
                    value: number;
                    currency: string;
                };
                totalInclTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
                priceInclTax: {
                    value: number;
                    currency: string;
                };
                totalQuantity: number;
                regularPrice: {
                    value: number;
                    currency: string;
                };
                product: {
                    __typename: string;
                    canonicalUrl: string;
                    urlKey: string;
                    uid: string;
                    name: string;
                    sku: string;
                    onlyXLeftInStock: null;
                    stockStatus: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                    id: string;
                    image: string;
                    productType: string;
                };
                thumbnail: {
                    label: string;
                    url: string;
                };
                configurableOptions: {
                    Size?: undefined;
                    Color?: undefined;
                };
                bundleOptions: null;
                itemPrices: {
                    priceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    originalPriceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    price: {
                        value: number;
                        currency: string;
                    };
                };
                downloadableLinks: null;
            } | {
                uid: string;
                quantity: number;
                status: string;
                requestQuantity: number;
                type: string;
                eligibleForReturn: boolean;
                productSku: string;
                productName: string;
                productUrlKey: string;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityOrdered: number;
                quantityRefunded: number;
                quantityReturned: number;
                quantityShipped: number;
                quantityReturnRequested: number;
                id: string;
                discounted: boolean;
                total: {
                    value: number;
                    currency: string;
                };
                totalInclTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
                priceInclTax: {
                    value: number;
                    currency: string;
                };
                totalQuantity: number;
                regularPrice: {
                    value: number;
                    currency: string;
                };
                product: {
                    __typename: string;
                    canonicalUrl: string;
                    urlKey: string;
                    uid: string;
                    name: string;
                    sku: string;
                    onlyXLeftInStock: null;
                    stockStatus: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                    id: string;
                    image: string;
                    productType: string;
                };
                thumbnail: {
                    label: string;
                    url: string;
                };
                configurableOptions: {
                    Size: string;
                    Color: string;
                };
                bundleOptions: null;
                itemPrices: {
                    priceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    originalPrice: {
                        value: number;
                        currency: string;
                    };
                    originalPriceIncludingTax: {
                        value: number;
                        currency: string;
                    };
                    price: {
                        value: number;
                        currency: string;
                    };
                };
                downloadableLinks: null;
            })[];
            tracking: {
                status: null;
                carrier: {
                    uid: string;
                    label: string;
                };
                trackingNumber: string;
            }[];
        }[];
        itemsEligibleForReturn: {
            __typename: string;
            status: string;
            productSku: string;
            eligibleForReturn: boolean;
            productName: string;
            productUrlKey: string;
            id: string;
            quantityOrdered: number;
            quantityShipped: number;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityRefunded: number;
            quantityReturnRequested: number;
            productSalePrice: {
                value: number;
                currency: string;
            };
            selectedOptions: {
                label: string;
                value: string;
            }[];
            product: {
                __typename: string;
                canonicalUrl: null;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
            };
            prices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
        }[];
        coupons: never[];
        shipments: {
            id: string;
            number: string;
            tracking: {
                title: string;
                number: string;
                carrier: string;
            }[];
            comments: never[];
            items: {
                id: string;
                productSku: string;
                productName: string;
                orderItem: {
                    __typename: string;
                    status: string;
                    productSku: string;
                    eligibleForReturn: boolean;
                    productName: string;
                    productUrlKey: string;
                    id: string;
                    quantityOrdered: number;
                    quantityShipped: number;
                    quantityCanceled: number;
                    quantityInvoiced: number;
                    quantityRefunded: number;
                    quantityReturnRequested: number;
                    productSalePrice: {
                        value: number;
                        currency: string;
                    };
                    selectedOptions: {
                        label: string;
                        value: string;
                    }[];
                    product: {
                        __typename: string;
                        canonicalUrl: null;
                        urlKey: string;
                        uid: string;
                        name: string;
                        sku: string;
                        onlyXLeftInStock: null;
                        stockStatus: string;
                        thumbnail: {
                            label: string;
                            url: string;
                        };
                        priceRange: {
                            maximumPrice: {
                                regularPrice: {
                                    currency: string;
                                    value: number;
                                };
                            };
                        };
                    };
                    prices: {
                        priceIncludingTax: {
                            value: number;
                            currency: string;
                        };
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        originalPriceIncludingTax: {
                            value: number;
                            currency: string;
                        };
                        price: {
                            value: number;
                            currency: string;
                        };
                    };
                };
            }[];
        }[];
        payments: {
            code: string;
            name: string;
        }[];
        shippingAddress: {
            city: string;
            company: null;
            countryCode: string;
            fax: null;
            firstName: string;
            lastName: string;
            middleName: null;
            postCode: string;
            prefix: null;
            region: string;
            regionId: string;
            street: string[];
            suffix: null;
            telephone: string;
            vatId: string;
        };
        billingAddress: {
            city: string;
            company: null;
            countryCode: string;
            fax: null;
            firstName: string;
            lastName: string;
            middleName: null;
            postCode: string;
            prefix: null;
            region: string;
            regionId: string;
            street: string[];
            suffix: null;
            telephone: string;
            vatId: string;
        };
        items: ({
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            quantityReturnRequested: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Size?: undefined;
                Color?: undefined;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
        } | {
            type: string;
            eligibleForReturn: boolean;
            productSku: string;
            productName: string;
            productUrlKey: string;
            quantityCanceled: number;
            quantityInvoiced: number;
            quantityOrdered: number;
            quantityRefunded: number;
            quantityReturned: number;
            quantityShipped: number;
            quantityReturnRequested: number;
            id: string;
            discounted: boolean;
            total: {
                value: number;
                currency: string;
            };
            totalInclTax: {
                value: number;
                currency: string;
            };
            price: {
                value: number;
                currency: string;
            };
            priceInclTax: {
                value: number;
                currency: string;
            };
            totalQuantity: number;
            regularPrice: {
                value: number;
                currency: string;
            };
            product: {
                __typename: string;
                canonicalUrl: string;
                urlKey: string;
                uid: string;
                name: string;
                sku: string;
                onlyXLeftInStock: null;
                stockStatus: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                priceRange: {
                    maximumPrice: {
                        regularPrice: {
                            currency: string;
                            value: number;
                        };
                    };
                };
                id: string;
                image: string;
                productType: string;
            };
            thumbnail: {
                label: string;
                url: string;
            };
            configurableOptions: {
                Size: string;
                Color: string;
            };
            bundleOptions: null;
            itemPrices: {
                priceIncludingTax: {
                    value: number;
                    currency: string;
                };
                originalPrice: {
                    value: number;
                    currency: string;
                };
                originalPriceIncludingTax: {
                    value: number;
                    currency: string;
                };
                price: {
                    value: number;
                    currency: string;
                };
            };
            downloadableLinks: null;
        })[];
        totalQuantity: number;
        shipping: {
            amount: number;
            currency: string;
            code: string;
        };
        returnNumber: string;
    };
    normalizeAddress: {
        billingAddress: ({
            name: string;
            orderNumber: number;
            value: string;
            label: null;
        } | {
            name: string;
            orderNumber: number;
            value: string[];
            label: null;
        } | {
            name: string;
            orderNumber: number;
            value: string;
            label: string;
        })[];
        shippingAddress: ({
            name: string;
            orderNumber: number;
            value: string;
            label: null;
        } | {
            name: string;
            orderNumber: number;
            value: string;
            label: string;
        } | {
            name: string;
            orderNumber: number;
            value: string[];
            label: string;
        })[];
    };
};
export declare const storeConfigMock: {
    baseMediaUrl: string;
    orderCancellationEnabled: boolean;
    orderCancellationReasons: {
        description: string;
    }[];
    shoppingOrderDisplayPrice: number;
    shoppingOrdersDisplaySubtotal: number;
    shoppingOrdersDisplayShipping: number;
    shoppingOrdersDisplayGrandTotal: boolean;
    shoppingOrdersDisplayFullSummary: boolean;
    shoppingOrdersDisplayZeroTax: boolean;
};
export declare const placeOrderMockData: {
    availableActions: string[];
    billingAddress: {
        city: string;
        company: string;
        countryCode: string;
        fax: string;
        firstName: string;
        lastName: string;
        middleName: string;
        postCode: string;
        prefix: string;
        region: string;
        regionId: string;
        street: string[];
        suffix: string;
        telephone: string;
        vatId: string;
        country: string;
        customAttributes: never[];
    };
    carrier: string;
    coupons: never[];
    discounts: {
        amount: {
            currency: string;
            value: number;
        };
        label: string;
    }[];
    email: string;
    giftWrappingOrder: {
        price: {
            currency: string;
            value: number;
        };
        uid: string;
    };
    grandTotal: {
        currency: string;
        value: number;
    };
    id: string;
    isVirtual: boolean;
    items: {
        taxCalculations: {
            includeAndExcludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            excludeTax: {
                originalPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
                baseExcludingTax: {
                    value: number;
                    currency: string;
                };
            };
            includeTax: {
                singleItemPrice: {
                    value: number;
                    currency: string;
                };
                baseOriginalPrice: {
                    value: number;
                    currency: string;
                };
                baseDiscountedPrice: {
                    value: number;
                    currency: string;
                };
            };
        };
        bundleOptions: null;
        configurableOptions: undefined;
        discounted: boolean;
        downloadableLinks: null;
        eligibleForReturn: boolean;
        giftCard: {
            message: string;
            recipientEmail: string;
            recipientName: string;
            senderEmail: string;
            senderName: string;
        };
        productGiftWrapping: {
            price: {
                currency: string;
                value: number;
            };
            uid: string;
        };
        id: undefined;
        price: {
            currency: undefined;
            value: number;
        };
        priceInclTax: {
            currency: undefined;
            value: number;
        };
        prices: {
            discounts: never[];
            originalPrice: {
                currency: string;
                value: number;
            };
            originalPriceIncludingTax: {
                currency: string;
                value: number;
            };
            price: {
                currency: string;
                value: number;
            };
            priceIncludingTax: {
                currency: string;
                value: number;
            };
        };
        itemPrices: {
            discounts: never[];
            originalPrice: {
                currency: string;
                value: number;
            };
            originalPriceIncludingTax: {
                currency: string;
                value: number;
            };
            price: {
                currency: string;
                value: number;
            };
            priceIncludingTax: {
                currency: string;
                value: number;
            };
        };
        product: {
            __typename: string;
            uid: string;
            canonicalUrl: string;
            id: string;
            image: string;
            name: string;
            onlyXLeftInStock: number;
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        currency: string;
                        value: number;
                    };
                };
            };
            productType: string;
            sku: string;
            stockStatus: string;
            thumbnail: {
                label: string;
                url: string;
            };
            urlKey: string;
        };
        productName: string;
        productSalePrice: undefined;
        productSku: string;
        productUrlKey: string;
        quantityCanceled: number;
        quantityInvoiced: number;
        quantityOrdered: number;
        quantityRefunded: number;
        quantityReturnRequested: number;
        quantityReturned: number;
        quantityShipped: number;
        regularPrice: {
            currency: undefined;
            value: undefined;
        };
        selectedOptions: never[];
        status: string;
        thumbnail: {
            label: string;
            url: string;
        };
        total: {
            currency: string;
            value: number;
        };
        totalInclTax: {
            currency: undefined;
            value: number;
        };
        totalQuantity: number;
        type: string;
    }[];
    itemsEligibleForReturn: undefined;
    number: string;
    orderDate: string;
    orderStatusChangeDate: string;
    payments: {
        code: string;
        name: string;
    }[];
    returns: never[];
    shipments: ({
        comments: never[];
        id: string;
        items: {
            id: string;
            orderItem: {
                taxCalculations: {
                    includeAndExcludeTax: {
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                        baseExcludingTax: {
                            value: number;
                            currency: string;
                        };
                    };
                    excludeTax: {
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                        baseExcludingTax: {
                            value: number;
                            currency: string;
                        };
                    };
                    includeTax: {
                        singleItemPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                    };
                };
                bundleOptions: null;
                configurableOptions: {};
                discounted: boolean;
                downloadableLinks: null;
                eligibleForReturn: boolean;
                giftCard: undefined;
                id: string;
                price: {
                    currency: string;
                    value: number;
                };
                priceInclTax: {
                    currency: string;
                    value: number;
                };
                prices: {
                    discounts: never[];
                    originalPrice: {
                        currency: string;
                        value: number;
                    };
                    originalPriceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                    price: {
                        currency: string;
                        value: number;
                    };
                    priceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                };
                itemPrices: {
                    discounts: never[];
                    originalPrice: {
                        currency: string;
                        value: number;
                    };
                    originalPriceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                    price: {
                        currency: string;
                        value: number;
                    };
                    priceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                };
                product: {
                    __typename: string;
                    canonicalUrl: string;
                    id: string;
                    image: string;
                    name: string;
                    onlyXLeftInStock: number;
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                    productType: string;
                    sku: string;
                    stockStatus: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    uid: string;
                    urlKey: string;
                };
                productName: string;
                productSalePrice: {
                    currency: string;
                    value: number;
                };
                productSku: string;
                productUrlKey: string;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityOrdered: number;
                quantityRefunded: number;
                quantityReturnRequested: number;
                quantityReturned: number;
                quantityShipped: number;
                regularPrice: {
                    currency: string;
                    value: number;
                };
                selectedOptions: never[];
                status: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                total: {
                    currency: string;
                    value: number;
                };
                totalInclTax: {
                    currency: string;
                    value: number;
                };
                totalQuantity: number;
                type: string;
            };
            productName: string;
            productSku: string;
            quantityShipped: undefined;
        }[];
        tracking: {
            number: string;
            title: string;
        }[];
    } | {
        comments: never[];
        id: string;
        items: {
            id: string;
            orderItem: {
                taxCalculations: {
                    includeAndExcludeTax: {
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                        baseExcludingTax: {
                            value: number;
                            currency: string;
                        };
                    };
                    excludeTax: {
                        originalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                        baseExcludingTax: {
                            value: number;
                            currency: string;
                        };
                    };
                    includeTax: {
                        singleItemPrice: {
                            value: number;
                            currency: string;
                        };
                        baseOriginalPrice: {
                            value: number;
                            currency: string;
                        };
                        baseDiscountedPrice: {
                            value: number;
                            currency: string;
                        };
                    };
                };
                bundleOptions: null;
                configurableOptions: {
                    Color: string;
                    Size: string;
                };
                discounted: boolean;
                downloadableLinks: null;
                eligibleForReturn: boolean;
                giftCard: undefined;
                id: string;
                price: {
                    currency: string;
                    value: number;
                };
                priceInclTax: {
                    currency: string;
                    value: number;
                };
                prices: {
                    discounts: never[];
                    originalPrice: {
                        currency: string;
                        value: number;
                    };
                    originalPriceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                    price: {
                        currency: string;
                        value: number;
                    };
                    priceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                };
                itemPrices: {
                    discounts: never[];
                    originalPrice: {
                        currency: string;
                        value: number;
                    };
                    originalPriceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                    price: {
                        currency: string;
                        value: number;
                    };
                    priceIncludingTax: {
                        currency: string;
                        value: number;
                    };
                };
                product: {
                    __typename: string;
                    canonicalUrl: string;
                    id: string;
                    image: string;
                    name: string;
                    onlyXLeftInStock: number;
                    priceRange: {
                        maximumPrice: {
                            regularPrice: {
                                currency: string;
                                value: number;
                            };
                        };
                    };
                    productType: string;
                    sku: string;
                    stockStatus: string;
                    thumbnail: {
                        label: string;
                        url: string;
                    };
                    uid: string;
                    urlKey: string;
                };
                productName: string;
                productSalePrice: {
                    currency: string;
                    value: number;
                };
                productSku: string;
                productUrlKey: string;
                quantityCanceled: number;
                quantityInvoiced: number;
                quantityOrdered: number;
                quantityRefunded: number;
                quantityReturnRequested: number;
                quantityReturned: number;
                quantityShipped: number;
                regularPrice: {
                    currency: string;
                    value: number;
                };
                selectedOptions: {
                    label: string;
                    value: string;
                }[];
                status: string;
                thumbnail: {
                    label: string;
                    url: string;
                };
                total: {
                    currency: string;
                    value: number;
                };
                totalInclTax: {
                    currency: string;
                    value: number;
                };
                totalQuantity: number;
                type: string;
            };
            productName: string;
            productSku: string;
            quantityShipped: undefined;
        }[];
        tracking: {
            number: string;
            title: string;
        }[];
    })[];
    shipping: {
        amount: number;
        code: string;
        currency: string;
    };
    shippingAddress: {
        city: string;
        company: string;
        countryCode: string;
        fax: string;
        firstName: string;
        lastName: string;
        middleName: string;
        postCode: string;
        prefix: string;
        region: string;
        regionId: string;
        street: string[];
        suffix: string;
        telephone: string;
        vatId: string;
        country: string;
        customAttributes: never[];
    };
    shippingMethod: null;
    status: string;
    subtotalExclTax: {
        currency: string;
        value: number;
    };
    subtotalInclTax: {
        currency: string;
        value: number;
    };
    taxes: never[];
    token: string;
    totalGiftcard: {
        currency: string;
        value: number;
    };
    totalQuantity: number;
    totalShipping: {
        currency: string;
        value: number;
    };
    totalTax: {
        currency: string;
        value: number;
    };
    totalGiftOptions: {
        giftWrappingForItems: {
            value: number;
            currency: string;
        };
        giftWrappingForItemsInclTax: {
            value: number;
            currency: string;
        };
        giftWrappingForOrder: {
            value: number;
            currency: string;
        };
        giftWrappingForOrderInclTax: {
            value: number;
            currency: string;
        };
        printedCard: {
            value: number;
            currency: string;
        };
        printedCardInclTax: {
            value: number;
            currency: string;
        };
    };
};
//# sourceMappingURL=mock.config.d.ts.map