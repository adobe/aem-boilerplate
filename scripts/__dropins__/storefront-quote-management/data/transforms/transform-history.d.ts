import { NegotiableQuoteHistoryEntry } from '../models/negotiable-quote-model';

/**
 * Transforms a history entry from the API format to the model format
 * @param historyEntry - Raw history entry from API
 * @returns Transformed history entry
 */
export declare function transformHistoryEntry(historyEntry: any): NegotiableQuoteHistoryEntry;
/**
 * Transforms an array of history entries from the API format to the model format
 * @param historyEntries - Array of raw history entries from API
 * @returns Array of transformed history entries
 */
export declare function transformHistory(historyEntries: any[] | null | undefined): NegotiableQuoteHistoryEntry[] | undefined;
//# sourceMappingURL=transform-history.d.ts.map