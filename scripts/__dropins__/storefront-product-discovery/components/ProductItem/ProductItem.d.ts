import { FunctionComponent, VNode } from 'preact';
import { AnchorHTMLAttributes } from 'preact/compat';
import { Product } from '../../data/models/product';

export interface ProductItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    productRouteSearch?: (product: Product) => string;
    productItem: Product;
    productImage?: VNode;
    productName?: VNode;
    productPrice?: VNode;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
//# sourceMappingURL=ProductItem.d.ts.map