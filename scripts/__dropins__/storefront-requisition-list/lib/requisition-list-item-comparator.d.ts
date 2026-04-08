import { Item } from '../data/models/item';

export interface ProductLike {
    sku: string;
    selectedOptions?: string[];
}
/**
 * Compares a requisition list item to the current product context (sku + selected options).
 * Used to determine if the product is already in a requisition list for active state.
 * Default: only SKU is compared. Option UIDs are compared only when options.matchBySkuOnly is false.
 */
export declare function isMatchingRequisitionListItem(requisitionListItem: Item, product: ProductLike, options?: {
    matchBySkuOnly?: boolean;
}): boolean;
//# sourceMappingURL=requisition-list-item-comparator.d.ts.map