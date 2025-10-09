import { NegotiableQuote } from '../../../data/models/quote';
import { ShippingMethod } from '../../../data/models/shipping-method';

export declare const simpleQuote: NegotiableQuote;
export declare const quoteWithShippingInfo: ({ methods, selection, }?: {
    methods?: ShippingMethod[] | undefined;
    selection?: ShippingMethod | undefined;
}) => NegotiableQuote;
//# sourceMappingURL=quote.d.ts.map