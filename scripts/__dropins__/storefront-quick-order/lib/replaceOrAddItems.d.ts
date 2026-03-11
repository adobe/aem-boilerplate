import { OrderItem, OrderItemInput } from '../types';

export interface ReplaceOrAddItemsResult {
    updatedItems: OrderItem[];
    addedItems: OrderItem[];
    replacedItems: OrderItem[];
    mergedItems: OrderItem[];
}
/**
 * Replace, merge, or add items into existing list
 * Handles three scenarios:
 * 1. Replace: When inputItem has replaceItemSku, replace item at same position
 *    - If new item already exists in list, collapse by removing replaced item and merging quantity
 * 2. Merge: When item exists, increase quantity
 * 3. Add: When item doesn't exist, add to end
 */
export declare const replaceOrAddItems: (existingItems: OrderItem[], newItems: OrderItem[], inputItems: OrderItemInput[]) => ReplaceOrAddItemsResult;
//# sourceMappingURL=replaceOrAddItems.d.ts.map