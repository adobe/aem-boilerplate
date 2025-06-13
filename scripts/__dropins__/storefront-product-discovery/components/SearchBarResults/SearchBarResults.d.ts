import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface SearchBarResultsProps extends HTMLAttributes<HTMLDivElement> {
    productList?: VNode[];
    viewAllButton?: VNode;
    onClose?: () => void;
}
export declare const SearchBarResults: FunctionComponent<SearchBarResultsProps>;
//# sourceMappingURL=SearchBarResults.d.ts.map