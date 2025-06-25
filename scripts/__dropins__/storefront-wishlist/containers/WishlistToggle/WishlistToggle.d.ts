import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { Product } from '../../data/models';
import { VNode } from 'preact';

export interface WishlistToggleProps extends HTMLAttributes<HTMLDivElement> {
    product: Product;
    iconWishlisted?: VNode<HTMLAttributes<SVGSVGElement>>;
    iconToWishlist?: VNode<HTMLAttributes<SVGSVGElement>>;
    size?: 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    labelToWishlist?: string;
    labelWishlisted?: string;
    onClick?: () => void;
    removeProdFromCart?: (product: {
        uid: string;
        quantity: number;
    }[]) => Promise<any>;
}
export declare const WishlistToggle: Container<WishlistToggleProps>;
//# sourceMappingURL=WishlistToggle.d.ts.map