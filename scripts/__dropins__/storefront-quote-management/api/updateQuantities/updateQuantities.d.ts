import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface QuantityItem {
    /** The unique ID of the quote item */
    quoteItemUid: string;
    /** The new quantity for the item (must be greater than 0) */
    quantity: number;
}
export interface UpdateQuantitiesInput {
    /** The unique ID of the negotiable quote */
    quoteUid: string;
    /** Array of items with their new quantities */
    items: QuantityItem[];
}
/**
 * Updates the quantities of items in a negotiable quote.
 *
 * @param input - The input parameters for updating quantities
 * @param input.quoteUid - The unique ID of the negotiable quote
 * @param input.items - Array of items with their new quantities
 * @returns Promise that resolves to the updated quote model
 * @throws Error if validation fails or GraphQL operation fails
 *
 * @example
 * ```ts
 * const quote = await updateQuantities({
 *   quoteUid: 'quote-123',
 *   items: [
 *     { quoteItemUid: 'item-1', quantity: 5 },
 *     { quoteItemUid: 'item-2', quantity: 3 }
 *   ]
 * });
 * ```
 */
export declare const updateQuantities: (input: UpdateQuantitiesInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=updateQuantities.d.ts.map