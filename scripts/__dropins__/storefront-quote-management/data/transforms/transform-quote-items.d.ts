import { CartItemModel } from '../models/negotiable-quote-model';

/**
 * Transforms a single quote item from the API format to the model format
 * @param item - Raw quote item from API
 * @returns Transformed quote item
 */
export declare function transformQuoteItem(item: any): CartItemModel;
/**
 * Transforms an array of quote items from the API format to the model format
 * @param items - Array of raw quote items from API
 * @returns Array of transformed quote items
 */
export declare function transformQuoteItems(items: any[] | null | undefined): CartItemModel[];
//# sourceMappingURL=transform-quote-items.d.ts.map