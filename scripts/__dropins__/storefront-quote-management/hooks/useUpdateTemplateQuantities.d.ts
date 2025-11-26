import { ProductListTableItem } from '../components';

export interface UseUpdateTemplateQuantitiesReturn {
    quantityChanges: Record<string, number>;
    handleQuantityChange: (item: ProductListTableItem, newQuantity: number) => void;
    handleUpdate: (e: SubmitEvent) => void;
    handleConfirmUpdate: () => Promise<void>;
    handleCancelUpdate: () => void;
    handleDismissBanner: () => void;
    isUpdateModalOpen: boolean;
    isUpdating: boolean;
    updateNotificationState: {
        type: 'success' | 'error' | null;
        message: string;
    };
}
export interface UseUpdateTemplateQuantitiesParams {
    templateId?: string;
    onUpdateModalStateChange?: (isOpen: boolean) => void;
    updateSuccessMessage: string;
    updateErrorMessage: string;
}
/**
 * Custom hook to manage updating quantities of items in a quote template
 */
export declare const useUpdateTemplateQuantities: (params: UseUpdateTemplateQuantitiesParams) => UseUpdateTemplateQuantitiesReturn;
//# sourceMappingURL=useUpdateTemplateQuantities.d.ts.map