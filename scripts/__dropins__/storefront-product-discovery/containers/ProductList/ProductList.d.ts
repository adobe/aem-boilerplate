import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { Product } from '../../data/models/product';

export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    minQueryLength?: number;
    slots?: {
        Header?: SlotProps;
        ProductActions?: SlotProps;
        ProductPrice?: SlotProps;
        ProductName?: SlotProps;
        ProductImage?: SlotProps;
        Footer?: SlotProps;
    };
    pageSize?: number;
    routeProduct?: (product: Product) => string;
    categoryPath?: string;
}
export declare const ProductList: Container<ProductListProps>;
//# sourceMappingURL=ProductList.d.ts.map