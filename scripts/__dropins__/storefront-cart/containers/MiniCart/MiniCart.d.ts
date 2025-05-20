import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CartModel } from '../../data/models';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';

export interface MiniCartProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeCart?: () => string;
    routeCheckout?: () => string;
    routeEmptyCartCTA?: () => string;
    slots?: {
        ProductList?: SlotProps;
        ProductListFooter?: SlotProps;
        PreCheckoutSection?: SlotProps;
        Thumbnail?: SlotProps<{
            item: CartModel['items'][number];
            defaultImageProps: ImageProps;
        }>;
    };
    hideFooter?: boolean;
    displayAllItems?: boolean;
    showDiscount?: boolean;
    showSavings?: boolean;
    enableItemRemoval?: boolean;
    enableQuantityUpdate?: boolean;
    hideHeading?: boolean;
}
export declare const MiniCart: Container<MiniCartProps, CartModel | null>;
//# sourceMappingURL=MiniCart.d.ts.map