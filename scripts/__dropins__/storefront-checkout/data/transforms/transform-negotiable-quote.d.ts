import { NegotiableQuote as NegotiableQuoteModel } from '../models';
import { GetNegotiableQuoteQuery } from '../../__generated__/types';

type NegotiableQuote = GetNegotiableQuoteQuery['negotiableQuote'];
export declare const transformNegotiableQuote: (data: NegotiableQuote | undefined) => NegotiableQuoteModel | null;
export {};
//# sourceMappingURL=transform-negotiable-quote.d.ts.map