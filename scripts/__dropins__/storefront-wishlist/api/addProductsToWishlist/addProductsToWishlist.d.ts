import { Wishlist } from '../../data/models/wishlist';

export declare const addProductsToWishlist: (items: [
    {
        sku: string;
        parentSku?: string;
        quantity: number;
        optionsUIDs?: string[];
        enteredOptions?: {
            uid: string;
            value: string;
        }[];
    }
]) => Promise<Wishlist | null>;
//# sourceMappingURL=addProductsToWishlist.d.ts.map