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
        Heading?: SlotProps;
        EmptyCart?: SlotProps;
        Footer?: SlotProps;
        ProductAttributes?: SlotProps;
        CartSummaryFooter?: SlotProps;
        CartItem?: SlotProps;
        UndoBanner?: SlotProps<{
            item: CartModel['items'][0];
            loading: boolean;
            error?: string;
            onUndo: () => void;
            onDismiss: () => void;
        }>;
        ItemTitle?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemPrice?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemQuantity?: SlotProps<{
            item: CartModel['items'][number];
            enableUpdateItemQuantity: boolean;
            handleItemQuantityUpdate: (item: CartModel['items'][number], quantity: number) => void;
            itemsLoading: Set<string>;
            handleItemsError: (uid: string, message?: string) => void;
            handleItemsLoading: (uid: string, state: boolean) => void;
            onItemUpdate?: ({ item }: {
                item: CartModel['items'][number];
            }) => void;
        }>;
        ItemTotal?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemSku?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemRemoveAction?: SlotProps<{
            item: CartModel['items'][number];
            enableRemoveItem: boolean;
            handleItemQuantityUpdate: (item: CartModel['items'][number], quantity: number) => void;
            handleItemsError: (uid: string, message?: string) => void;
            handleItemsLoading: (uid: string, state: boolean) => void;
            onItemUpdate?: ({ item }: {
                item: CartModel['items'][number];
            }) => void;
            itemsLoading: Set<string>;
        }>;
    };
    hideFooter?: boolean;
    displayAllItems?: boolean;
    showDiscount?: boolean;
    showSavings?: boolean;
    enableItemRemoval?: boolean;
    enableQuantityUpdate?: boolean;
    hideHeading?: boolean;
    undo?: boolean;
}
export declare const MiniCart: Container<MiniCartProps, CartModel | null>;
//# sourceMappingURL=MiniCart.d.ts.map