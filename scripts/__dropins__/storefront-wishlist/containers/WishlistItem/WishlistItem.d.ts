import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { Item, Product } from '../../data/models';
import { ImageNodeRenderProps } from '../../../@adobe-commerce/elsie/src/components';
import { JSX } from 'preact';

export interface WishlistItemProps extends HTMLAttributes<HTMLDivElement> {
    initialData: Item | null;
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