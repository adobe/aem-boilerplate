import { OrderItem } from '../types';

export interface UpdateItemResult {
    updatedItems: OrderItem[];
    wasMerged: boolean;
    mergedIntoIndex?: number;
}
/**
 * Update a specific item in the list and check for duplicates
 * If duplicate is found, merge the items
 */
export declare const updateItemInList: (items: OrderItem[], itemId: string, updatedItem: OrderItem, currentQuantity?: number) => UpdateItemResult;
//# sourceMappingURL=updateItemInList.d.ts.map