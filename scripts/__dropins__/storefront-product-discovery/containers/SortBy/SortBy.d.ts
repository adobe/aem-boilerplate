import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { Scope, SortOrder } from '../../data/models';

export interface SortByProps extends HTMLAttributes<HTMLDivElement> {
    scope?: Scope;
    onSortChange?: (value: SortOrder | null) => void;
}
export declare const SortBy: Container<SortByProps>;
//# sourceMappingURL=SortBy.d.ts.map