import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { Item, Product } from '../../data/models';
import { ImageNodeRenderProps } from '@dropins/tools/types/elsie/src/components';
import { JSX } from 'preact';

export interface WishlistItemProps extends HTMLAttributes<HTMLDivElement> {
    item: Item;
    getProductData?: (sku: string) => Promise<Product | null>;
    getRefinedProduct?: (sku: string, optionUIDs: string[], anchorOptions?: string[], raw?: boolean) => Promise<Product | null>;
    moveProdToCart: (products: {
        sku: string;
        quantity: number;
        optionsUIDs?: [];
        enteredOptions?: [];
    }[]) => Promise<any>;
    routeProdDetailPage: (product: Product) => string;
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const WishlistItem: Container<WishlistItemProps>;
//# sourceMappingURL=WishlistItem.d.ts.map