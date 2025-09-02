import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { Scope } from '../../data/models';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
    scope?: Scope;
    onPageChange?: (page: number) => void;
}
export declare const Pagination: Container<PaginationProps>;
//# sourceMappingURL=Pagination.d.ts.map