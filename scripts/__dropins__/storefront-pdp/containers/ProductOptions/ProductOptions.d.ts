import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ProductModel } from '../../data/models';
import { ImageNodeRenderProps, ImageProps } from '@dropins/tools/types/elsie/src/components';

export interface ProductOptionsProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
    hideSelectedValue?: boolean;
    onValues?: (optionsUIDs: string[]) => void;
    onErrors?: (errors: {
        [id: string]: string;
    }) => void;
    slots?: {
        Swatches?: SlotProps<{
            data: ProductModel | null;
            optionsUIDs: string[];
        }>;
        SwatchImage?: SlotProps<{
            data: ProductModel | null;
            optionsUIDs: string[];
            imageSwatchContext: ImageNodeRenderProps['imageSwatchContext'];
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const ProductOptions: Container<ProductOptionsProps, {
    data: ProductModel | null;
    optionsUIDs: string[];
}>;
//# sourceMappingURL=ProductOptions.d.ts.map