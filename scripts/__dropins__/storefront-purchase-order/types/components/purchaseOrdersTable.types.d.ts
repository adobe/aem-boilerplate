import { VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { PageSizeListProps, PaginationState } from '.';
import { AlertMessageConfigType } from '../hooks';

export type Column = {
    label: string | VNode<HTMLAttributes<HTMLElement>>;
    key: string;
    ariaLabel?: string;
};
export type TableColumn = {
    label: string;
    key: string;
    ariaLabel?: string;
} | {
    label: VNode<HTMLAttributes<HTMLElement>>;
    key: string;
    ariaLabel: string;
};
export interface Row {
    [key: string]: VNode | string | number | undefined;
    _rowDetails?: VNode | string;
}
export interface PurchaseOrdersTableProps {
    pageSizeConfig: {
        pageSizeOptionsList: PageSizeListProps[];
        onChange: (event: Event) => void;
    };
    totalCount?: number;
    columns: Column[];
    rows: Row[];
    expandedRows?: Set<number>;
    paginationConfig: PaginationState;
    loading?: boolean;
    className?: string;
    emptyTitle?: string;
    variant?: 'primary' | 'secondary';
    skeletonRowCount?: number | string;
    footer?: VNode | string | null;
    header?: VNode | string | null;
    alertMessageConfig?: AlertMessageConfigType;
    withWrapper?: boolean;
}
//# sourceMappingURL=purchaseOrdersTable.types.d.ts.map