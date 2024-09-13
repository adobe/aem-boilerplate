export declare const guestOrderByToken: (token: string) => Promise<{
    __typename?: "CustomerOrder" | undefined;
    number: string;
    status: string;
    email?: string | null | undefined;
    shipping_method?: string | null | undefined;
    is_virtual: boolean;
    payment_methods?: ({
        __typename?: "OrderPaymentMethod" | undefined;
        name: string;
        type: string;
    } | null)[] | null | undefined;
    total?: {
        __typename?: "OrderTotal" | undefined;
        subtotal: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        total_tax: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        total_shipping: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
        grand_total: {
            __typename?: "Money" | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
            value?: number | null | undefined;
        };
    } | null | undefined;
    billing_address?: {
        __typename?: "OrderAddress" | undefined;
        firstname: string;
        middlename?: string | null | undefined;
        lastname: string;
        street: (string | null)[];
        city: string;
        postcode?: string | null | undefined;
        telephone?: string | null | undefined;
        country_code?: import('../../__generated__/types').CountryCodeEnum | null | undefined;
        region?: string | null | undefined;
        region_id?: string | null | undefined;
        company?: string | null | undefined;
        custom_attributesV2: ({
            __typename?: "AttributeSelectedOptions" | undefined;
            code: string;
        } | {
            __typename?: "AttributeValue" | undefined;
            value: string;
            code: string;
        } | null)[];
    } | null | undefined;
    shipping_address?: {
        __typename?: "OrderAddress" | undefined;
        firstname: string;
        middlename?: string | null | undefined;
        lastname: string;
        street: (string | null)[];
        city: string;
        postcode?: string | null | undefined;
        telephone?: string | null | undefined;
        country_code?: import('../../__generated__/types').CountryCodeEnum | null | undefined;
        region?: string | null | undefined;
        region_id?: string | null | undefined;
        company?: string | null | undefined;
        custom_attributesV2: ({
            __typename?: "AttributeSelectedOptions" | undefined;
            code: string;
        } | {
            __typename?: "AttributeValue" | undefined;
            value: string;
            code: string;
        } | null)[];
    } | null | undefined;
    items?: ({
        __typename: "BundleOrderItem";
        id: string;
        quantity_canceled?: number | null | undefined;
        quantity_invoiced?: number | null | undefined;
        quantity_ordered?: number | null | undefined;
        quantity_refunded?: number | null | undefined;
        quantity_returned?: number | null | undefined;
        quantity_shipped?: number | null | undefined;
        product_sale_price: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        product?: {
            __typename?: "BundleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "ConfigurableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "DownloadableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GiftCardProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GroupedProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "SimpleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "VirtualProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | null | undefined;
        selected_options?: ({
            __typename?: "OrderItemOption" | undefined;
            label: string;
            value: string;
        } | null)[] | null | undefined;
    } | {
        __typename: "DownloadableOrderItem";
        id: string;
        quantity_canceled?: number | null | undefined;
        quantity_invoiced?: number | null | undefined;
        quantity_ordered?: number | null | undefined;
        quantity_refunded?: number | null | undefined;
        quantity_returned?: number | null | undefined;
        quantity_shipped?: number | null | undefined;
        product_sale_price: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        product?: {
            __typename?: "BundleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "ConfigurableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "DownloadableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GiftCardProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GroupedProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "SimpleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "VirtualProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | null | undefined;
        selected_options?: ({
            __typename?: "OrderItemOption" | undefined;
            label: string;
            value: string;
        } | null)[] | null | undefined;
    } | {
        __typename: "GiftCardOrderItem";
        id: string;
        quantity_canceled?: number | null | undefined;
        quantity_invoiced?: number | null | undefined;
        quantity_ordered?: number | null | undefined;
        quantity_refunded?: number | null | undefined;
        quantity_returned?: number | null | undefined;
        quantity_shipped?: number | null | undefined;
        gift_card?: {
            __typename?: "GiftCardItem" | undefined;
            recipient_name?: string | null | undefined;
            recipient_email?: string | null | undefined;
            sender_name?: string | null | undefined;
            sender_email?: string | null | undefined;
            message?: string | null | undefined;
        } | null | undefined;
        product_sale_price: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        product?: {
            __typename?: "BundleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "ConfigurableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "DownloadableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GiftCardProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GroupedProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "SimpleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "VirtualProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | null | undefined;
        selected_options?: ({
            __typename?: "OrderItemOption" | undefined;
            label: string;
            value: string;
        } | null)[] | null | undefined;
    } | {
        __typename: "OrderItem";
        id: string;
        quantity_canceled?: number | null | undefined;
        quantity_invoiced?: number | null | undefined;
        quantity_ordered?: number | null | undefined;
        quantity_refunded?: number | null | undefined;
        quantity_returned?: number | null | undefined;
        quantity_shipped?: number | null | undefined;
        product_sale_price: {
            __typename?: "Money" | undefined;
            value?: number | null | undefined;
            currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
        };
        product?: {
            __typename?: "BundleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "ConfigurableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "DownloadableProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GiftCardProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "GroupedProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "SimpleProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | {
            __typename?: "VirtualProduct" | undefined;
            name?: string | null | undefined;
            sku?: string | null | undefined;
            thumbnail?: {
                __typename?: "ProductImage" | undefined;
                label?: string | null | undefined;
                url?: string | null | undefined;
            } | null | undefined;
            price_range: {
                __typename?: "PriceRange" | undefined;
                maximum_price?: {
                    __typename?: "ProductPrice" | undefined;
                    regular_price: {
                        __typename?: "Money" | undefined;
                        currency?: import('../../__generated__/types').CurrencyEnum | null | undefined;
                        value?: number | null | undefined;
                    };
                } | null | undefined;
            };
        } | null | undefined;
        selected_options?: ({
            __typename?: "OrderItemOption" | undefined;
            label: string;
            value: string;
        } | null)[] | null | undefined;
    } | null)[] | null | undefined;
}>;
//# sourceMappingURL=guestOrderByToken.d.ts.map