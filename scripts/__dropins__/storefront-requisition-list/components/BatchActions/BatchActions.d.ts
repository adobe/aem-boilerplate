import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface BatchActionsProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
    selectedItems: Set<string>;
    deletingItemId: string | null;
    addingToCartItemId: string | null;
    bulkAddingToCart: boolean;
    updatingQuantityItemId: string | null;
    onSelectAll: () => void;
    onSelectNone: () => void;
    onBulkAddToCart: () => void;
    onBulkDelete: () => void;
}
export declare const BatchActions: FunctionComponent<BatchActionsProps>;
//# sourceMappingURL=BatchActions.d.ts.map