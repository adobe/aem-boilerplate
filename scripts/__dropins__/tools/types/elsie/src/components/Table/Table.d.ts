import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

type Sortable = 'asc' | 'desc' | true;
type Column = {
    label: string;
    key: string;
    ariaLabel?: string;
    sortBy?: Sortable;
} | {
    label: VNode<HTMLAttributes<HTMLElement>>;
    key: string;
    ariaLabel: string;
    sortBy?: Sortable;
};
type RowData = {
    [key: string]: VNode | string | number | undefined;
    _rowDetails?: VNode | string;
};
export interface TableProps extends Omit<HTMLAttributes<HTMLTableElement>, 'loading'> {
    columns: Column[];
    rowData: RowData[];
    mobileLayout?: 'stacked' | 'none';
    caption?: string;
    expandedRows?: Set<number>;
    loading?: boolean;
    skeletonRowCount?: number;
    onSortChange?: (columnKey: string, direction: Sortable) => void;
}
export declare const Table: FunctionComponent<TableProps>;
export {};
//# sourceMappingURL=Table.d.ts.map