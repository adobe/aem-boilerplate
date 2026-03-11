import { OrderItem } from '../types';

/**
 * Find duplicate item in the list based on multiple comparison strategies
 * Returns the index of the duplicate item, or -1 if not found
 *
 * Strategies:
 * 1. Both have variantSku - compare variants
 * 2. Existing has variantSku, new has sku - compare them
 * 3. New has variantSku, existing has sku - compare them
 * 4. Neither has variantSku - compare base SKU
 */
export declare const findDuplicateItem: (items: OrderItem[], newItem: OrderItem) => number;
/**
 * Find duplicate item excluding a specific item by ID
 * Used when checking for duplicates after an item update
 */
export declare const findDuplicateItemExcluding: (items: OrderItem[], updatedItem: OrderItem, excludeItemId: string) => number;
//# sourceMappingURL=findDuplicateItem.d.ts.map