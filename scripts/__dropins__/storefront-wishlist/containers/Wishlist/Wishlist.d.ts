import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';

export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    routeEmptyWishlistCTA?: () => string;
    routeToWishlist?: string;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
}
export declare const Wishlist: Container<WishlistProps>;
//# sourceMappingURL=Wishlist.d.ts.map