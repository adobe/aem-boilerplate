import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ItemsQuotedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    loading?: boolean;
    table?: VNode;
    pricesSummary?: VNode;
}
export declare const ItemsQuoted: FunctionComponent<ItemsQuotedProps>;
export declare const ItemsQuotedSkeleton: FunctionComponent;
//# sourceMappingURL=ItemsQuoted.d.ts.map