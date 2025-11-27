import { CartItemModel } from '../data/models/negotiable-quote-model';

export interface UseRemoveTemplateItemsReturn {
    handleRemoveItems: (items: CartItemModel[]) => void;
    handleConfirmRemove: () => Promise<void>;
    handleCancelRemove: () => void;
    isRemoveModalOpen: boolean;
    itemsToRemove: CartItemModel[];
    isRemoving: boolean;
    removeNotificationState: {
        type: 'success' | 'error' | null;
        message: string;
    };
}
export interface UseRemoveTemplateItemsParams {
    templateId?: string;
    onRemoveModalStateChange?: (isOpen: boolean) => void;
    removeSuccessMessage: string;
    removeErrorMessage: string;
}
/**
 * Custom hook to manage removing items from a quote template
 */
export declare const useRemoveTemplateItems: (params: UseRemoveTemplateItemsParams) => UseRemoveTemplateItemsReturn;
//# sourceMappingURL=useRemoveTemplateItems.d.ts.map