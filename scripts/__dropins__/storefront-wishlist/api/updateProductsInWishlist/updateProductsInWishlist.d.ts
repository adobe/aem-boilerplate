import { Wishlist } from '../../data/models/wishlist';

export declare const updateProductsInWishlist: (items: {
    wishlistItemId: string;
    quantity: number;
    description: string;
    selectedOptions?: string[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
}[]) => Promise<Wishlist | null>;
//# sourceMappingURL=updateProductsInWishlist.d.ts.map