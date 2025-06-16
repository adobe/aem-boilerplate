import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CartModel } from '../../data/models/cart-model';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';

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
    };
    /** Function for getting the product page route */
    routeProduct?: (item: CartModel['items'][number]) => string;
    /** Whether to allow quantity updates */
    allowQuantityUpdates?: boolean;
    /** Whether to allow remove items */
    allowRemoveItems?: boolean;
    /** On quantity update */
    onQuantityUpdate?: (item: CartModel['items'][number], quantity: number) => void;
    /** On item remove */
    onItemRemove?: (item: CartModel['items'][number]) => void;
}
/**
 * Container component for CartSummaryTable that provides slots for customizing the table cells
 * and handles data management
 */
export declare const CartSummaryTable: Container<CartSummaryTableContainerProps, CartModel | null>;
//# sourceMappingURL=CartSummaryTable.d.ts.map