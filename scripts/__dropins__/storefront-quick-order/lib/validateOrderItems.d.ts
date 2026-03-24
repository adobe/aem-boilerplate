import { OrderItem } from '../types';

/**
 * Validates order items to determine if all items are ready for cart addition
 * @param items - Array of order items to validate
 * @returns true if all items are valid, false otherwise
 */
export declare const validateOrderItems: (items: OrderItem[]) => boolean;
/**
 * Get items that are out of stock
 * @param items - Array of order items to check
 * @returns Array of out of stock items with their names
 */
export declare const getOutOfStockItems: (items: OrderItem[]) => Array<{
    sku: string;
    name: string;
}>;
/**
 * Get items with missing required options
 * @param items - Array of order items to check
 * @returns Array of items missing required options
 */
export declare const getItemsMissingOptions: (items: OrderItem[]) => Array<{
    sku: string;
    name: string;
}>;
/**
 * Get items with incomplete data
 * @param items - Array of order items to check
 * @returns Array of items with incomplete data
 */
export declare const getItemsWithIncompleteData: (items: OrderItem[]) => Array<{
    sku: string;
    name: string;
}>;
/**
 * Get all items with validation errors
 * @param items - Array of order items to check
 * @returns Array of all items with validation errors and their SKUs
 */
export declare const getInvalidItems: (items: OrderItem[]) => Array<{
    sku: string;
    name: string;
    reason: string;
}>;
//# sourceMappingURL=validateOrderItems.d.ts.map