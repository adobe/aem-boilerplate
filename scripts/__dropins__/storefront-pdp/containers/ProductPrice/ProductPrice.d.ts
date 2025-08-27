import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models';

export interface ProductPriceProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
}
export declare const ProductPrice: Container<ProductPriceProps, ProductModel | null>;
//# sourceMappingURL=ProductPrice.d.ts.map