import { NegotiableQuoteModel } from '../../models/negotiable-quote-model';

export declare const mockGraphQLResponse: {
    data: {
        requestNegotiableQuote: {
            quote: {
                uid: string;
                created_at: string;
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
                    };
                    quantity: number;
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
            };
        };
    };
};
export declare const expectedTransformedQuote: NegotiableQuoteModel;
//# sourceMappingURL=negotiableQuoteData.d.ts.map