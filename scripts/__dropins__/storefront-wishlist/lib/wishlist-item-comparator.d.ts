import { Item } from '../data/models/wishlist';

interface ProductLike {
    sku: string;
    optionUIDs?: string[];
}
/**
 * Helper function to compare wishlist items by their SKU and selected options
 */
export declare function isMatchingWishlistItem(wishlistItem: Item, product: ProductLike): boolean;
export {};
//# sourceMappingURL=wishlist-item-comparator.d.ts.map