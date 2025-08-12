import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CartModel } from '../../data/models/cart-model';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';

export interface CartSummaryListProps extends HTMLAttributes<HTMLDivElement> {
    hideHeading?: boolean;
    hideFooter?: boolean;
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeEmptyCartCTA?: () => string;
    routeCart?: () => string;
    onItemUpdate?: ({ item }: {
        item: CartModel['items'][0];
    }) => void;
    onItemRemove?: ({ item }: {
        item: CartModel['items'][0];
    }) => void;
    maxItems?: number;
    showMaxItems?: boolean;
    attributesToHide?: SwitchableAttributes[];
    slots?: {
        Heading?: SlotProps;
        EmptyCart?: SlotProps;
        Footer?: SlotProps;
        Thumbnail?: SlotProps<{
            item: CartModel['items'][number];
            defaultImageProps: ImageProps;
        }>;
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
    enableRemoveItem?: boolean;
    enableUpdateItemQuantity?: boolean;
    onItemsErrorsChange?: (errors: Map<string, string>) => void;
    accordion?: boolean;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
    showDiscount?: boolean;
    showSavings?: boolean;
    quantityType?: 'stepper' | 'dropdown';
    dropdownOptions?: {
        value: string;
        text: string;
    }[];
    undo?: boolean;
    /**
     * TEST ONLY: Allows test to inject recentlyRemovedItems for coverage
     */
    __testRecentlyRemovedItems?: Array<{
        item: CartModel['items'][0];
        index: number;
        loading: boolean;
        error?: string;
        beingRemoved?: boolean;
    }>;
}
export type SwitchableAttributes = 'name' | 'image' | 'configurations' | 'warning' | 'alert' | 'sku' | 'price' | 'quantity' | 'total' | 'totalDiscount' | 'totalExcludingTax';
export interface CartSummaryListRef {
    handleUndo: (uid: string) => Promise<void>;
}
export declare const CartSummaryList: Container<CartSummaryListProps, CartModel | null>;
//# sourceMappingURL=CartSummaryList.d.ts.map