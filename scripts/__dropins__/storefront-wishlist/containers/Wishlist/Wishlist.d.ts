import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { Item, Product } from '../../data/models';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';

export interface WishlistProps extends HTMLAttributes<HTMLDivElement> {
    routeEmptyWishlistCTA?: () => string;
    routeToWishlist?: string;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
    }[]) => Promise<any>;
    routeProdDetailPage: (product: Product) => string;
    getProductData?: (sku: string) => Promise<Product | null>;
    getRefinedProduct?: (sku: string, optionUIDs: string[], anchorOptions?: string[], raw?: boolean) => Promise<Product | null>;
    slots?: {
        image?: SlotProps<{
            defaultImageProps: ImageProps;
            item: Item;
        }>;
    };
}
export declare const Wishlist: Container<WishlistProps>;
//# sourceMappingURL=Wishlist.d.ts.map