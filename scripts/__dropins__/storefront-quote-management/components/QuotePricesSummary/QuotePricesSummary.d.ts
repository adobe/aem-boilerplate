import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

interface Entry {
    label: string;
    id: string;
    value: VNode;
    strong?: boolean;
    children?: Entry[];
}
export interface QuotePricesSummaryProps extends HTMLAttributes<HTMLDivElement> {
    entries?: Entry[];
}
export declare const QuotePricesSummary: FunctionComponent<QuotePricesSummaryProps>;
export {};
//# sourceMappingURL=QuotePricesSummary.d.ts.map