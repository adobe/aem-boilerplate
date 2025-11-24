import { Item } from '../../data/models/item';

/**
 * Enriches configurable products with variant data by calling the refineProduct query
 *
 * @param items - Array of requisition list items
 * @returns Promise resolving to array of items with configured_product populated for configurable items
 */
export declare const enrichConfigurableProducts: (items: Item[]) => Promise<Item[]>;
//# sourceMappingURL=enrichConfigurableProducts.d.ts.map