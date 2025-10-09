export declare const mockQuoteData: {
    uid: string;
    name: string;
    created_at: string;
    status: string;
    sales_rep_name: string;
    expiration_date: string;
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
    items: {
        product: {
            name: string;
            sku: string;
            uid: string;
            stock_status: string;
            quantity: null;
            price_range: {
                maximum_price: {
                    regular_price: {
                        value: number;
                    };
                };
            };
        };
        prices: {
            price: {
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
            catalog_discount: {
                amount_off: number;
                percent_off: number;
            };
            discounts: {
                label: string;
                value: number;
                amount: {
                    value: number;
                    currency: string;
                };
            }[];
        };
        quantity: number;
    }[];
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
        applied_taxes: {
            amount: {
                value: number;
                currency: string;
            };
            label: string;
        }[];
        grand_total: {
            currency: string;
            value: number;
        };
    };
};
//# sourceMappingURL=negotiableQuoteData.d.ts.map