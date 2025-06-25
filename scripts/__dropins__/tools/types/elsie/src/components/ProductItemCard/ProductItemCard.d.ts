import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ProductItemCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    image?: VNode;
    titleNode?: VNode;
    price?: VNode;
    sku?: VNode;
    actionButton?: VNode;
    swatches?: VNode;
    initialized?: boolean;
}
export declare const ProductItemCard: FunctionComponent<ProductItemCardProps>;
//# sourceMappingURL=ProductItemCard.d.ts.map