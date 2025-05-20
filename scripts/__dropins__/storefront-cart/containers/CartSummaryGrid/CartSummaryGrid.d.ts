import { HTMLAttributes } from 'preact/compat';
import { CartModel } from '../../data/models';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';

export interface CartSummaryGridProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeEmptyCartCTA?: () => string;
    slots?: {
        Thumbnail?: SlotProps<{
            item: CartModel['items'][number];
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const CartSummaryGrid: Container<CartSummaryGridProps, CartModel | null>;
//# sourceMappingURL=CartSummaryGrid.d.ts.map