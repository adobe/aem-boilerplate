import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { RequisitionListModel } from '../../data/models/requisitionList';

export interface ProductListTableProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    className?: string;
    items: RequisitionListModel['items'];
    selectedItems: Set<string>;
    currentPage: number;
    pageSize: number;
    canEdit?: boolean;
    handleItemSelection: (itemUid: string, isSelected: boolean) => void;
    handleUpdateQuantity: (itemUid: string, newQuantity: number) => void;
    onAddToCart: (itemUids: string[] | undefined) => void;
    onDeleteItem: (itemUids: string[] | undefined) => void;
}
export declare const ProductListTable: FunctionComponent<ProductListTableProps>;
//# sourceMappingURL=ProductListTable.d.ts.map