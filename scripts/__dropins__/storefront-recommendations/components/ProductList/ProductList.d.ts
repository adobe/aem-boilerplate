import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement>, Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    heading?: VNode | null;
    products?: VNode | null;
    loading?: boolean;
}
export declare const ProductList: FunctionComponent<ProductListProps>;
//# sourceMappingURL=ProductList.d.ts.map