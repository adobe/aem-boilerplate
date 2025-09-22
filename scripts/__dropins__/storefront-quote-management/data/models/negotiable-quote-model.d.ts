export interface NegotiableQuoteModel {
    uid: string;
    createdAt: string;
    status: string;
    buyer: {
        firstname: string;
        lastname: string;
    };
    comments: {
        uid: string;
        createdAt: string;
        author: {
            firstname: string;
            lastname: string;
        };
    }[];
    items: {
        product: {
            uid: string;
            sku: string;
            name: string;
            priceRange: {
                maximumPrice: {
                    regularPrice: {
                        value: number;
                    };
                };
            };
        };
        quantity: number;
        prices: {
            subtotalExcludingTax: {
                value: number;
            };
            subtotalIncludingTax: {
                value: number;
            };
            subtotalWithDiscountExcludingTax: {
                value: number;
            };
            grandTotal: {
                value: number;
            };
        };
    }[];
}
//# sourceMappingURL=negotiable-quote-model.d.ts.map