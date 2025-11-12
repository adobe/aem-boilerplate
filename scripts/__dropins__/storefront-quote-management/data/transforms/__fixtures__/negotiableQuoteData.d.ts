import { NegotiableQuoteStatus } from '../../models/negotiable-quote-model';

export declare const mockGraphQLResponse: {
    data: {
        requestNegotiableQuote: {
            quote: {
                uid: string;
                name: string;
                created_at: string;
                updated_at: string;
                status: string;
                buyer: {
                    firstname: string;
                    lastname: string;
                };
                comments: {
                    uid: string;
                    created_at: string;
                    author: {
                        firstname: string;
                        lastname: string;
                    };
                }[];
                items: {
                    uid: string;
                    product: {
                        uid: string;
                        sku: string;
                        name: string;
                        price_range: {
                            maximum_price: {
                                regular_price: {
                                    value: number;
                                };
                            };
                        };
                        thumbnail: {
                            url: string;
                            label: string;
                        };
                    };
                    quantity: number;
                    note_from_buyer: {
                        created_at: string;
                        creator_id: number;
                        creator_type: number;
                        negotiable_quote_item_uid: string;
                        note: string;
                        note_uid: string;
                    }[];
                    note_from_seller: {
                        created_at: string;
                        creator_id: number;
                        creator_type: number;
                        negotiable_quote_item_uid: string;
                        note: string;
                        note_uid: string;
                    }[];
                }[];
                prices: {
                    applied_taxes: {
                        label: string;
                        amount: {
                            value: number;
                            currency: string;
                        };
                    }[];
                    discounts: {
                        label: string;
                        amount: {
                            value: number;
                            currency: string;
                        };
                        coupon: {
                            code: string;
                        };
                    }[];
                    subtotal_excluding_tax: {
                        value: number;
                    };
                    subtotal_including_tax: {
                        value: number;
                    };
                    subtotal_with_discount_excluding_tax: {
                        value: number;
                    };
                    grand_total: {
                        value: number;
                        currency: string;
                    };
                    grand_total_excluding_tax: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
    };
};
export declare const mockQuoteData: {
    uid: string;
    name: string;
    created_at: string;
    status: string;
    is_virtual: boolean;
    total_quantity: number;
    sales_rep_name: string;
    expiration_date: string;
    updated_at: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
    }[];
    template_id: null;
    template_name: null;
    items: ({
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            quantity: null;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        currency: string;
                        value: number;
                    };
                    discount: {
                        amount_off: number;
                        percent_off: number;
                    };
                };
            };
            price_tiers: {
                quantity: number;
                final_price: {
                    currency: string;
                    value: number;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            }[];
        };
        prices: {
            price: {
                currency: string;
                value: number;
            };
            price_including_tax: {
                currency: string;
                value: number;
            };
            original_item_price: {
                currency: string;
                value: number;
            };
            original_row_total: {
                currency: string;
                value: number;
            };
            row_total: {
                currency: string;
                value: number;
            };
            row_total_including_tax: {
                currency: string;
                value: number;
            };
            catalog_discount: {
                amount_off: number;
                percent_off: number;
            };
            discounts: {
                label: string;
                value: number;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        note_from_buyer: {
            created_at: string;
            creator_id: number;
            creator_type: number;
            negotiable_quote_item_uid: string;
            note: string;
            note_uid: string;
        }[];
        note_from_seller: {
            created_at: string;
            creator_id: number;
            creator_type: number;
            negotiable_quote_item_uid: string;
            note: string;
            note_uid: string;
        }[];
        customizable_options: {
            type: string;
            label: string;
            values: {
                label: string;
                value: string;
            }[];
        }[];
        configurable_options?: undefined;
        configured_variant?: undefined;
        bundle_options?: undefined;
        links?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            quantity: null;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        currency: string;
                        value: number;
                    };
                    discount?: undefined;
                };
            };
            price_tiers?: undefined;
        };
        prices: {
            price: {
                currency: string;
                value: number;
            };
            price_including_tax: {
                currency: string;
                value: number;
            };
            original_item_price: {
                currency: string;
                value: number;
            };
            original_row_total: {
                currency: string;
                value: number;
            };
            row_total: {
                currency: string;
                value: number;
            };
            row_total_including_tax: {
                currency: string;
                value: number;
            };
            catalog_discount: {
                amount_off: number;
                percent_off: number;
            };
            discounts: never[];
        };
        quantity: number;
        configurable_options: {
            option_label: string;
            value_label: string;
        }[];
        note_from_buyer: {
            created_at: string;
            creator_id: number;
            creator_type: number;
            negotiable_quote_item_uid: string;
            note: string;
            note_uid: string;
        }[];
        note_from_seller: never[];
        configured_variant: {
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
                    discount: {
                        amount_off: number;
                        percent_off: number;
                    };
                };
            };
            price_tiers: {
                quantity: number;
                final_price: {
                    currency: string;
                    value: number;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            }[];
        };
        customizable_options: {
            type: string;
            label: string;
            values: {
                label: string;
                value: string;
            }[];
        }[];
        bundle_options?: undefined;
        links?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            quantity: null;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        currency: string;
                        value: number;
                    };
                    discount: {
                        amount_off: number;
                        percent_off: number;
                    };
                };
            };
            price_tiers?: undefined;
        };
        prices: {
            price: {
                currency: string;
                value: number;
            };
            price_including_tax: {
                currency: string;
                value: number;
            };
            original_item_price: {
                currency: string;
                value: number;
            };
            original_row_total: {
                currency: string;
                value: number;
            };
            row_total: {
                currency: string;
                value: number;
            };
            row_total_including_tax: {
                currency: string;
                value: number;
            };
            catalog_discount: {
                amount_off: number;
                percent_off: number;
            };
            discounts: {
                label: string;
                value: number;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        bundle_options: {
            label: string;
            values: {
                label: string;
                quantity: number;
                original_price: {
                    currency: string;
                    value: number;
                };
                priceV2: {
                    currency: string;
                    value: number;
                };
            }[];
        }[];
        note_from_buyer: {
            created_at: string;
            creator_id: number;
            creator_type: number;
            negotiable_quote_item_uid: string;
            note: string;
            note_uid: string;
        }[];
        note_from_seller: {
            created_at: string;
            creator_id: number;
            creator_type: number;
            negotiable_quote_item_uid: string;
            note: string;
            note_uid: string;
        }[];
        customizable_options?: undefined;
        configurable_options?: undefined;
        configured_variant?: undefined;
        links?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            quantity: null;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        currency: string;
                        value: number;
                    };
                    discount: {
                        amount_off: number;
                        percent_off: number;
                    };
                };
            };
            price_tiers: {
                quantity: number;
                final_price: {
                    currency: string;
                    value: number;
                };
                discount: {
                    amount_off: number;
                    percent_off: number;
                };
            }[];
        };
        prices: {
            price: {
                currency: string;
                value: number;
            };
            price_including_tax: {
                currency: string;
                value: number;
            };
            original_item_price: {
                currency: string;
                value: number;
            };
            original_row_total: {
                currency: string;
                value: number;
            };
            row_total: {
                currency: string;
                value: number;
            };
            row_total_including_tax: {
                currency: string;
                value: number;
            };
            catalog_discount: {
                amount_off: number;
                percent_off: number;
            };
            discounts: {
                label: string;
                value: number;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        links: {
            sort_order: number;
            title: string;
        }[];
        customizable_options: {
            type: string;
            label: string;
            values: {
                label: string;
                value: string;
            }[];
        }[];
        note_from_buyer?: undefined;
        note_from_seller?: undefined;
        configurable_options?: undefined;
        configured_variant?: undefined;
        bundle_options?: undefined;
    })[];
    history: {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        change_type: string;
        changes: {
            comment_added: {
                comment: string;
            };
            statuses: {
                changes: {
                    new_status: string;
                    old_status: null;
                }[];
            };
            expiration: {
                new_expiration: null;
                old_expiration: null;
            };
        };
    }[];
    prices: {
        subtotal_excluding_tax: {
            currency: string;
            value: number;
        };
        subtotal_including_tax: {
            currency: string;
            value: number;
        };
        subtotal_with_discount_excluding_tax: {
            currency: string;
            value: number;
        };
        applied_taxes: {
            label: string;
            amount: {
                currency: string;
                value: number;
            };
        }[];
        discounts: {
            label: string;
            amount: {
                currency: string;
                value: number;
            };
            coupon: {
                code: string;
            };
        }[];
        grand_total: {
            currency: string;
            value: number;
        };
        grand_total_excluding_tax: {
            currency: string;
            value: number;
        };
    };
    shipping_addresses: {
        uid: string;
        firstname: string;
        lastname: string;
        company: string;
        street: string[];
        city: string;
        region: {
            code: string;
            label: string;
            region_id: number;
        };
        postcode: string;
        country: {
            code: string;
            label: string;
        };
        telephone: string;
        selected_shipping_method: {
            amount: {
                currency: string;
                value: number;
            };
            carrier_code: string;
            carrier_title: string;
            method_code: string;
            method_title: string;
            price_excl_tax: {
                value: number;
                currency: string;
            };
            price_incl_tax: {
                value: number;
                currency: string;
            };
        };
    }[];
};
export declare const mockNegotiableQuotesResponse: {
    data: {
        negotiableQuotes: {
            items: {
                uid: string;
                name: string;
                created_at: string;
                updated_at: string;
                status: NegotiableQuoteStatus;
                buyer: {
                    firstname: string;
                    lastname: string;
                };
                items: {
                    uid: string;
                    product: {
                        uid: string;
                        sku: string;
                        name: string;
                        template_id: string;
                        template_name: string;
                        price_range: {
                            maximum_price: {
                                regular_price: {
                                    value: number;
                                };
                            };
                        };
                        thumbnail: {
                            url: string;
                            label: string;
                        };
                    };
                    quantity: number;
                    note_from_buyer: {
                        created_at: string;
                        creator_id: number;
                        creator_type: number;
                        negotiable_quote_item_uid: string;
                        note: string;
                        note_uid: string;
                    }[];
                    note_from_seller: never[];
                }[];
                prices: {
                    subtotal_excluding_tax: {
                        value: number;
                    };
                    subtotal_including_tax: {
                        value: number;
                    };
                    subtotal_with_discount_excluding_tax: {
                        value: number;
                    };
                    grand_total: {
                        value: number;
                    };
                };
            }[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
};
export declare const mockEmptyNegotiableQuotesResponse: {
    data: {
        negotiableQuotes: {
            items: never[];
            page_info: {
                current_page: number;
                page_size: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
};
export declare const mockNullNegotiableQuotesResponse: {
    data: {
        negotiableQuotes: null;
    };
};
//# sourceMappingURL=negotiableQuoteData.d.ts.map