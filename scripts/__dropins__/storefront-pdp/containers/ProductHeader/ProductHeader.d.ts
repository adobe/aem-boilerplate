import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models';

export interface ProductHeaderProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
    hideSku?: boolean;
    /** When true, show variant SKU when all options are selected (configurable product). Default false. */
    showVariantSku?: boolean;
    /** When true, show variant name when all options are selected (configurable product). Default false. */
    showVariantName?: boolean;
}
export declare const ProductHeader: Container<ProductHeaderProps, ProductModel | null>;
//# sourceMappingURL=ProductHeader.d.ts.map