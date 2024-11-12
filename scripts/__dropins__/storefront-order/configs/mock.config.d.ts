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
                    available_actions: string[];
                    status: string;
                    number: string;
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
    id: string;
    orderDate: string;
    carrier: string;
    shippingMethod: null;
    coupons: never[];
    shipments: {
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
export declare const storyBookShortOrderData: {
    email: string;
    status: string;
    number: string;
    id: string;
    orderDate: string;
    carrier: string;
    shippingMethod: string;
    payments: {
        code: string;
        name: string;
    }[];
    totalQuantity: number;
    shipping: {
        amount: number;
        currency: string;
        code: string;
    };
};
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
    totalGiftcard: {
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
//# sourceMappingURL=mock.config.d.ts.map