import { Wishlist } from '../../data/models/wishlist';

export declare const removeProductsFromWishlist: (items: Array<{
    id: string;
    product: {
        sku: string;
    };
}>) => Promise<Wishlist | null>;
//# sourceMappingURL=removeProductsFromWishlist.d.ts.map