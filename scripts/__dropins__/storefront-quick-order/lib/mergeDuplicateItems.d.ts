import { OrderItem } from '../types';

/**
 * Merge duplicate items by removing the item at removeIndex and
 * adding its quantity to the item at mergeIntoIndex
 */
export declare const mergeDuplicateItems: (items: OrderItem[], removeIndex: number, mergeIntoIndex: number, quantityToAdd?: number) => OrderItem[];
//# sourceMappingURL=mergeDuplicateItems.d.ts.map