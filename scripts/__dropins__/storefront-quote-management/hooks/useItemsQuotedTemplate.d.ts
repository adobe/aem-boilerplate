import { ProductListTableItem } from '../components';
import { CartItemModel } from '../data/models/negotiable-quote-model';

export interface UseItemsQuotedTemplateReturn {
    dropdownSelections: Record<string, string | undefined>;
    handleItemDropdownChange: (item: ProductListTableItem, action: string) => void;
    handleDismissRemoveBanner: () => void;
}
export interface UseItemsQuotedTemplateParams {
    handleRemoveItems: (items: CartItemModel[]) => void;
}
/**
 * Custom hook to manage dropdown selections and item actions for quote template items
 */
export declare const useItemsQuotedTemplate: (params: UseItemsQuotedTemplateParams) => UseItemsQuotedTemplateReturn;
//# sourceMappingURL=useItemsQuotedTemplate.d.ts.map