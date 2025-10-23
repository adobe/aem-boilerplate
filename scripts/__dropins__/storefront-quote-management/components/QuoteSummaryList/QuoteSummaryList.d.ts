import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface QuoteSummaryListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    heading?: VNode | null;
    footer?: VNode | null;
    products?: VNode | null;
    outOfStockMessage?: VNode | null;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
}
export declare const QuoteSummaryList: FunctionComponent<QuoteSummaryListProps>;
//# sourceMappingURL=QuoteSummaryList.d.ts.map