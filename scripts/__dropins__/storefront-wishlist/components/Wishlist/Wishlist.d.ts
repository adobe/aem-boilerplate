import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    heading?: VNode | null;
    emptyWishlist: VNode;
    products?: VNode | null;
    wishlistAlert: VNode | null;
}
export declare const Wishlist: FunctionComponent<WishlistProps>;
//# sourceMappingURL=Wishlist.d.ts.map