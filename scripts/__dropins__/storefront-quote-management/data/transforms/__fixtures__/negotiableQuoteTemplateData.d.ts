/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const mockQuoteTemplateData: {
    template_id: string;
    uid: string;
    name: string;
    created_at: string;
    updated_at: string;
    expiration_date: string;
    status: string;
    sales_rep_name: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: ({
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments: {
            name: string;
            url: string;
        }[];
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments?: undefined;
    })[];
    items: ({
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
        configured_variant: {
            uid: string;
            sku: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
    })[];
    history: ({
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
                new_expiration: string;
                old_expiration: null;
            };
            custom_changes?: undefined;
            total?: undefined;
        };
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        change_type: string;
        changes: {
            custom_changes: {
                new_value: string;
                old_value: string;
                title: string;
            };
            statuses: {
                changes: {
                    new_status: string;
                    old_status: string;
                }[];
            };
            total: {
                new_price: {
                    currency: string;
                    value: number;
                };
                old_price: {
                    currency: string;
                    value: number;
                };
            };
            comment_added?: undefined;
            expiration?: undefined;
        };
    })[];
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
        grand_total: {
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
    }[];
    reference_document_links: ({
        link_id: string;
        document_name: string;
        document_identifier: string;
        reference_document_url: string;
    } | {
        link_id: string;
        document_name: string;
        reference_document_url: string;
        document_identifier?: undefined;
    })[];
};
export declare const mockMinimalQuoteTemplateData: {
    template_id: string;
    uid: string;
    name: string;
    created_at: string;
    updated_at: string;
    status: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    items: never[];
};
export declare const mockSubmittedQuoteTemplateData: {
    template_id: string;
    uid: string;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    expiration_date: string;
    sales_rep_name: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: ({
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments: {
            name: string;
            url: string;
        }[];
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments?: undefined;
    })[];
    items: ({
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
        configured_variant: {
            uid: string;
            sku: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
    })[];
    history: ({
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
                new_expiration: string;
                old_expiration: null;
            };
            custom_changes?: undefined;
            total?: undefined;
        };
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        change_type: string;
        changes: {
            custom_changes: {
                new_value: string;
                old_value: string;
                title: string;
            };
            statuses: {
                changes: {
                    new_status: string;
                    old_status: string;
                }[];
            };
            total: {
                new_price: {
                    currency: string;
                    value: number;
                };
                old_price: {
                    currency: string;
                    value: number;
                };
            };
            comment_added?: undefined;
            expiration?: undefined;
        };
    })[];
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
        grand_total: {
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
    }[];
    reference_document_links: ({
        link_id: string;
        document_name: string;
        document_identifier: string;
        reference_document_url: string;
    } | {
        link_id: string;
        document_name: string;
        reference_document_url: string;
        document_identifier?: undefined;
    })[];
};
export declare const mockInReviewQuoteTemplateData: {
    template_id: string;
    uid: string;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    expiration_date: string;
    sales_rep_name: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: ({
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments: {
            name: string;
            url: string;
        }[];
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments?: undefined;
    })[];
    items: ({
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
        configured_variant: {
            uid: string;
            sku: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
    })[];
    history: ({
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
                new_expiration: string;
                old_expiration: null;
            };
            custom_changes?: undefined;
            total?: undefined;
        };
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        change_type: string;
        changes: {
            custom_changes: {
                new_value: string;
                old_value: string;
                title: string;
            };
            statuses: {
                changes: {
                    new_status: string;
                    old_status: string;
                }[];
            };
            total: {
                new_price: {
                    currency: string;
                    value: number;
                };
                old_price: {
                    currency: string;
                    value: number;
                };
            };
            comment_added?: undefined;
            expiration?: undefined;
        };
    })[];
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
        grand_total: {
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
    }[];
    reference_document_links: ({
        link_id: string;
        document_name: string;
        document_identifier: string;
        reference_document_url: string;
    } | {
        link_id: string;
        document_name: string;
        reference_document_url: string;
        document_identifier?: undefined;
    })[];
};
export declare const mockClosedQuoteTemplateData: {
    template_id: string;
    uid: string;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    expiration_date: string;
    sales_rep_name: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: ({
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments: {
            name: string;
            url: string;
        }[];
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments?: undefined;
    })[];
    items: ({
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
        configured_variant: {
            uid: string;
            sku: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
    })[];
    history: ({
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
                new_expiration: string;
                old_expiration: null;
            };
            custom_changes?: undefined;
            total?: undefined;
        };
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        change_type: string;
        changes: {
            custom_changes: {
                new_value: string;
                old_value: string;
                title: string;
            };
            statuses: {
                changes: {
                    new_status: string;
                    old_status: string;
                }[];
            };
            total: {
                new_price: {
                    currency: string;
                    value: number;
                };
                old_price: {
                    currency: string;
                    value: number;
                };
            };
            comment_added?: undefined;
            expiration?: undefined;
        };
    })[];
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
        grand_total: {
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
    }[];
    reference_document_links: ({
        link_id: string;
        document_name: string;
        document_identifier: string;
        reference_document_url: string;
    } | {
        link_id: string;
        document_name: string;
        reference_document_url: string;
        document_identifier?: undefined;
    })[];
};
export declare const mockInactiveQuoteTemplateData: {
    template_id: string;
    uid: string;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    expiration_date: string;
    sales_rep_name: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: ({
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments: {
            name: string;
            url: string;
        }[];
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        text: string;
        attachments?: undefined;
    })[];
    items: ({
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
        };
        configured_variant: {
            uid: string;
            sku: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        bundle_options?: undefined;
    } | {
        __typename: string;
        uid: string;
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            thumbnail: {
                url: string;
                label: string;
            };
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                        currency: string;
                    };
                };
            };
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
                value: string;
                amount: {
                    currency: string;
                    value: number;
                };
            }[];
        };
        quantity: number;
        is_available: boolean;
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
        configured_variant?: undefined;
        configurable_options?: undefined;
    })[];
    history: ({
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
                new_expiration: string;
                old_expiration: null;
            };
            custom_changes?: undefined;
            total?: undefined;
        };
    } | {
        uid: string;
        created_at: string;
        author: {
            firstname: string;
            lastname: string;
        };
        change_type: string;
        changes: {
            custom_changes: {
                new_value: string;
                old_value: string;
                title: string;
            };
            statuses: {
                changes: {
                    new_status: string;
                    old_status: string;
                }[];
            };
            total: {
                new_price: {
                    currency: string;
                    value: number;
                };
                old_price: {
                    currency: string;
                    value: number;
                };
            };
            comment_added?: undefined;
            expiration?: undefined;
        };
    })[];
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
        grand_total: {
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
    }[];
    reference_document_links: ({
        link_id: string;
        document_name: string;
        document_identifier: string;
        reference_document_url: string;
    } | {
        link_id: string;
        document_name: string;
        reference_document_url: string;
        document_identifier?: undefined;
    })[];
};
export declare const mockQuoteTemplateListData: {
    items: {
        template_id: string;
        name: string;
        created_at: string;
        updated_at: string;
        status: string;
        state: string;
        min_negotiated_grand_total: number;
        last_shared_at: string;
        last_ordered_at: string;
        expiration_date: string;
        orders_placed: number;
        prices: {
            grand_total: {
                value: number;
                currency: string;
            };
        };
    }[];
    page_info: {
        current_page: number;
        page_size: number;
        total_pages: number;
    };
    total_count: number;
    sort_fields: {
        default: string;
        options: {
            label: string;
            value: string;
        }[];
    };
};
export declare const mockEmptyQuoteTemplateListData: {
    items: never[];
    page_info: {
        current_page: number;
        page_size: number;
        total_pages: number;
    };
    total_count: number;
};
//# sourceMappingURL=negotiableQuoteTemplateData.d.ts.map