import { NegotiableQuoteModel, NegotiableQuotesListModel, PaginationInfo } from '../models/negotiable-quote-model';

export declare function transformQuote(quoteData: any): NegotiableQuoteModel | null;
export declare function transformNegotiableQuotesList(quotesData: any): NegotiableQuotesListModel | null;
export declare function transformPaginationInfo(quotesData: NegotiableQuotesListModel | null): PaginationInfo | null;
export declare const getDefaultPageSizeOptions: () => number[];
export declare function calculateTotal(data: any[], currency: string): any;
export declare function transformShippingPrices(quote: any): {
    shippingIncludingTax?: undefined;
    shippingExcludingTax?: undefined;
} | {
    shippingIncludingTax: any;
    shippingExcludingTax: any;
};
//# sourceMappingURL=transform-quote.d.ts.map