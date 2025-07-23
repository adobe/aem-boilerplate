import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '../../../@adobe-commerce/elsie/src/lib';
import { Item, Product } from '../../data/models';
import { ImageProps } from '../../../@adobe-commerce/elsie/src/components';

export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    routeEmptyWishlistCTA?: () => string;
    routeToWishlist?: string;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
    routeProdDetailPage: (product: Product) => string;
    slots?: {
        image?: SlotProps<{
            defaultImageProps: ImageProps;
            item: Item;
        }>;
    };
}
export declare const Wishlist: Container<WishlistProps>;
//# sourceMappingURL=Wishlist.d.ts.map