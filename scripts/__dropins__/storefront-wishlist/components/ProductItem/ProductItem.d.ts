import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, JSX } from 'preact';
import { ImageNodeRenderProps } from '@dropins/tools/types/elsie/src/components';
import { Item, Product } from '../../data/models';

export interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    item?: Item;
    onCartActionButtonClick?: () => boolean;
    onTrashButtonClick?: () => boolean;
    routeProdDetailPage: (product: Product) => string;
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
//# sourceMappingURL=ProductItem.d.ts.map