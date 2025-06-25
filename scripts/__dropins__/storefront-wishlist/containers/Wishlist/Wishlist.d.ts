import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { Product } from '../../data/models';

export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    routeEmptyWishlistCTA?: () => string;
    routeToWishlist?: string;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
    routeProdDetailPage: (product: Product) => string;
}
export declare const Wishlist: Container<WishlistProps>;
//# sourceMappingURL=Wishlist.d.ts.map