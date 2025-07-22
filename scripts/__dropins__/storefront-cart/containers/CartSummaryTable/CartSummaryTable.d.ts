import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CartModel } from '../../data/models/cart-model';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { VNode } from 'preact';

export interface CartSummaryTableContainerProps extends HTMLAttributes<HTMLDivElement> {
    /** Initial data for the cart */
    initialData?: CartModel | null;
    /** Optional CSS class name for custom styling */
    className?: string;
    /** Slots for customizing different parts of the table */
    slots?: {
        /** Slot for customizing the item cell content */
        Item?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the price cell content */
        Price?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the quantity cell content */
        Quantity?: SlotProps<{
            item: CartModel['items'][number];
            isUpdating: boolean;
            quantityInputValue: number;
            handleInputChange: (e: Event) => void;
            itemUpdateErrors: Map<string, string>;
        }>;
        /** Slot for customizing the subtotal cell content */
        Subtotal?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the thumbnail image on an item */
        Thumbnail?: SlotProps<{
            item: CartModel['items'][number];
            defaultImageProps: ImageProps;
            index: number;
        }>;
        /** Slot for customizing the product title on an item */
        ProductTitle?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the product sku on an item */
        Sku?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the product configurations on an item */
        Configurations?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the product alert on an item */
        ItemAlert?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the product warning on an item */
        ItemWarning?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        /** Slot for customizing the actions on an item */
        Actions?: SlotProps<{
            item: CartModel['items'][number];
            itemsUpdating: Map<string, {
                isUpdating: boolean;
                updatedValue: number;
            }>;
            setItemUpdating: (uid: string, state: boolean) => void;
            setItemUpdateError: (uid: string, error: string) => void;
        }>;
        UndoBanner?: SlotProps<{
            item: CartModel['items'][number];
            loading: boolean;
            error?: string;
            onUndo: () => void;
            onDismiss: () => void;
        }>;
        /** Slot for customizing the empty cart */
        EmptyCart?: SlotProps;
    };
    /** Function for getting the product page route */
    routeProduct?: (item: CartModel['items'][number]) => string;
    /** Function for getting the empty cart CTA route */
    routeEmptyCartCTA?: () => string;
    /** Whether to allow quantity updates */
    allowQuantityUpdates?: boolean;
    /** Whether to allow remove items */
    allowRemoveItems?: boolean;
    /** On quantity update */
    onQuantityUpdate?: (item: CartModel['items'][number], quantity: number) => void;
    /** On item remove */
    onItemRemove?: (item: CartModel['items'][number]) => void;
    /** Whether to enable undo functionality for removed items */
    undo?: boolean;
}
/**
 * Container component for CartSummaryTable that provides slots for customizing the table cells
 * and handles data management
 */
export declare const CartSummaryTable: Container<CartSummaryTableContainerProps, CartModel | null>;
export declare const createUndoHandler: (recentlyRemovedItems: {
    item: CartModel['items'][number];
    index: number;
    loading: boolean;
    error?: string;
}[], setRecentlyRemovedItems: (updater: (prev: {
    item: CartModel['items'][number];
    index: number;
    loading: boolean;
    error?: string;
}[]) => {
    item: CartModel['items'][number];
    index: number;
    loading: boolean;
    error?: string;
}[]) => void) => (uid: string) => Promise<void>;
export declare const createDismissHandler: (setRecentlyRemovedItems: (updater: (prev: {
    item: CartModel['items'][number];
    index: number;
    loading: boolean;
    error?: string;
}[]) => {
    item: CartModel['items'][number];
    index: number;
    loading: boolean;
    error?: string;
}[]) => void) => (uid: string) => void;
/**
 * Helper function to determine if an undo is currently being removed
 * This makes the logic more explicit and testable
 */
export declare const getIsUndoBeingRemoved: (itemUid: string, itemsUpdating: Map<string, {
    isUpdating: boolean;
    updatedValue: number;
}>) => boolean;
/**
 * Helper function to create additional actions for undo banner
 * This makes the ternary operator logic more explicit and testable
 */
export declare const createUndoBannerActions: (isUndoBeingRemoved: boolean, dictionary: any, handleUndo: (uid: string) => void, handleDismiss: (uid: string) => void, itemUid: string, itemName: string) => {
    label: any;
    onClick: () => void;
    'aria-label': string;
}[];
/**
 * Helper function to create undo callback
 */
export declare const createUndoCallback: (handleUndo: (uid: string) => void, itemUid: string) => () => void;
/**
 * Helper function to create dismiss callback
 */
export declare const createDismissCallback: (handleDismiss: (uid: string) => void, itemUid: string) => () => void;
export declare const createUndoBanner: (removed: {
    item: CartModel['items'][number];
    index: number;
    error?: string | undefined;
}, item: CartModel['items'][number], isUndoBeingRemoved: boolean, dictionary: any, handleUndo: (uid: string) => void, handleDismiss: (uid: string) => void, slots?: CartSummaryTableContainerProps['slots']) => VNode;
//# sourceMappingURL=CartSummaryTable.d.ts.map