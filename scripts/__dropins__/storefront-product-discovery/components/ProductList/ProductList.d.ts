import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    header?: VNode;
    productList?: VNode[];
    footer?: VNode;
}
export declare const ProductList: FunctionComponent<ProductListProps>;
//# sourceMappingURL=ProductList.d.ts.map