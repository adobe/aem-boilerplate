import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { Product } from '../../data/models';

export interface WishlistToggleProps extends HTMLAttributes<HTMLDivElement> {
    isGuestWishlistEnabled?: boolean;
    product: Product;
}
export declare const WishlistToggle: Container<WishlistToggleProps>;
//# sourceMappingURL=WishlistToggle.d.ts.map