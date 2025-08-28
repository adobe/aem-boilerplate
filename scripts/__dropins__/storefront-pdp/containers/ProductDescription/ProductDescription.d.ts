import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models';

export interface ProductDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
}
export declare const ProductDescription: Container<ProductDescriptionProps, ProductModel | null>;
//# sourceMappingURL=ProductDescription.d.ts.map