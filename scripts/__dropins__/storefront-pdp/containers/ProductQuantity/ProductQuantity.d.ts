import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../@adobe-commerce/elsie/src/lib';
import { ProductModel } from '../../data/models';

export interface ProductQuantityProps extends HTMLAttributes<HTMLDivElement> {
    onValue?: (quantity: number) => void;
}
export declare const ProductQuantity: Container<ProductQuantityProps, ProductModel | null>;
//# sourceMappingURL=ProductQuantity.d.ts.map