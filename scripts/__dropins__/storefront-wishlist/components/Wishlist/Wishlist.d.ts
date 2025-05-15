import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Wishlist as WishlistModel } from '../../data/models';

export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    wishlistData: WishlistModel;
    wishlistAlert: VNode | null;
    isLoggedIn: boolean;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
    routeEmptyWishlistCTA?: () => string;
}
export declare const Wishlist: FunctionComponent<WishlistProps>;
//# sourceMappingURL=Wishlist.d.ts.map