import { OrderItem } from '../types';

export interface AddOrMergeItemsResult {
    updatedItems: OrderItem[];
    addedItems: OrderItem[];
    mergedItems: OrderItem[];
}
/**
 * Add or merge items into existing list
 * Returns updated list and information about which items were added/merged
 */
export declare const addOrMergeItems: (existingItems: OrderItem[], newItems: OrderItem[]) => AddOrMergeItemsResult;
//# sourceMappingURL=addOrMergeItems.d.ts.map