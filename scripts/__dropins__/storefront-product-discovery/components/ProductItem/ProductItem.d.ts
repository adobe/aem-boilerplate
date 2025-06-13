import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Product } from '../../data/models/product';

export interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
    productItem: Product;
    productImage?: VNode;
    productName?: VNode;
    productPrice?: VNode;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
//# sourceMappingURL=ProductItem.d.ts.map