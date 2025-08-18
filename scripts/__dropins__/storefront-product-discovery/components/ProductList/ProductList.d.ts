import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    productList?: VNode[];
    header?: VNode;
    footer?: VNode;
    imageWidth?: number;
    imageHeight?: number;
}
export declare const ProductList: FunctionComponent<ProductListProps>;
//# sourceMappingURL=ProductList.d.ts.map