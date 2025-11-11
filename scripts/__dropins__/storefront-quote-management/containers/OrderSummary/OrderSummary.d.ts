import { OrderSummaryLineItem } from '../../components';
import { NegotiableQuoteModel } from '../../data/models';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface OrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
    showTotalSaved?: boolean;
    updateLineItems?: (lineItems: Array<OrderSummaryLineItem>) => Array<OrderSummaryLineItem>;
}
export declare const OrderSummary: Container<OrderSummaryProps, NegotiableQuoteModel | null>;
//# sourceMappingURL=OrderSummary.d.ts.map