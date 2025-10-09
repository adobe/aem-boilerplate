import { HTMLAttributes } from 'preact/compat';
import { RequisitionList } from '../../data/models/requisitionList';

export interface RequisitionListViewProps extends HTMLAttributes<HTMLDivElement> {
    currentRequisitionList: RequisitionList;
    loadingProducts?: boolean;
    productError?: string | null;
    selectedItems: Set<string>;
    deletingItemId: string | null;
    deleteError: string | null;
    addingToCartItemId: string | null;
    addToCartError: string | null;
    bulkAddingToCart: boolean;
    updatingQuantityItemId: string | null;
    updateQuantityError: string | null;
    onItemSelection: (itemUid: string, isSelected: boolean) => void;
    onSelectAll: () => void;
    onSelectNone: () => void;
    onAddToCart: (itemUid: string) => void;
    onBulkAddToCart: () => void;
    onBulkDelete: () => void;
    onUpdateQuantity: (itemUid: string, newQuantity: number) => void;
    onDeleteItem: (itemUid: string) => void;
    onPageChange?: (page: number) => void;
    loadingPage?: boolean;
    routeRequisitionListGrid?: () => string | void;
}
export declare const RequisitionListView: ({ currentRequisitionList, loadingProducts, productError, selectedItems, deletingItemId, deleteError, addingToCartItemId, addToCartError, bulkAddingToCart, updatingQuantityItemId, updateQuantityError, onItemSelection, onSelectAll, onSelectNone, onAddToCart, onBulkAddToCart, onBulkDelete, onUpdateQuantity, onDeleteItem, onPageChange, loadingPage, routeRequisitionListGrid, }: RequisitionListViewProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=RequisitionListView.d.ts.map