import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models';

type DefaultSlotContext = {
    data: ProductModel | null;
};
export interface ProductAttributesProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
    slots?: {
        Attributes?: SlotProps<DefaultSlotContext>;
    };
}
export declare const ProductAttributes: Container<ProductAttributesProps, ProductModel | null>;
export {};
//# sourceMappingURL=ProductAttributes.d.ts.map