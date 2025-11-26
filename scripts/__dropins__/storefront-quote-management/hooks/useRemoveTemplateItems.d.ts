import { QuoteTemplateCartItem } from '../data/models/negotiable-quote-template-model';

export interface UseRemoveTemplateItemsReturn {
    handleRemoveItems: (items: QuoteTemplateCartItem[]) => void;
    handleConfirmRemove: () => Promise<void>;
    handleCancelRemove: () => void;
    isRemoveModalOpen: boolean;
    itemsToRemove: QuoteTemplateCartItem[];
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