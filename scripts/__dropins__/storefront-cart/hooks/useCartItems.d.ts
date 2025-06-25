import { CartModel } from '../data/models';
import { useText } from '@dropins/tools/types/elsie/src/i18n';
import { PriceProps } from '@dropins/tools/types/elsie/src/components/Price';

/**
 * Params for the useCartItems hook
 *
 * @param {
 *  dictionary: ReturnType<typeof useText>;
 *  onQuantityUpdate?: (item: CartModel['items'][number], quantity: number) => void;
 *  onItemRemove?: (item: CartModel['items'][number]) => void;
 * }
 *
 * dictionary - The dictionary
 * onQuantityUpdate - The function to call when the quantity is updated
 * onItemRemove - The function to call when the item is removed
 */
export interface useCartItemsProps {
    dictionary: ReturnType<typeof useText>;
    onQuantityUpdate?: (item: CartModel['items'][number], quantity: number) => void;
    onItemRemove?: (item: CartModel['items'][number]) => void;
}
/**
 * Params for the getConfiguration function
 */
interface GetConfigurationParams {
    item: CartModel['items'][number];
}
interface ItemUpdateState {
    isUpdating: boolean;
    updatedValue: any;
}
/**
 * Type for the API returned by useCartItems
 *
 * This interface ensures that the returned object from the hook is well-typed and clear for consumers.
 */
export interface UseCartItemsApi {
    showIncludedTaxPrice: boolean;
    showExcludingTaxPrice: boolean;
    itemsUpdating: Map<string, ItemUpdateState>;
    itemUpdateErrors: Map<string, string>;
    getConfiguration: (params: GetConfigurationParams) => object | undefined;
    getPriceProps: (item: CartModel['items'][number]) => PriceProps;
    getSubtotalProps: (item: CartModel['items'][number]) => {
        subtotalProps: PriceProps;
        subtotalDiscountProps: PriceProps | null;
    };
    processQuantityChange: (item: CartModel['items'][number], value: number) => Promise<void>;
    debouncedQuantityChange: (item: CartModel['items'][number], value: number) => void;
    setItemsUpdating: (itemsUpdating: Map<string, ItemUpdateState>) => void;
    getWarningMessage: (item: CartModel['items'][number]) => string | undefined;
    setItemUpdateError: (uid: string, error: string) => void;
    handleRemoveItem: (item: CartModel['items'][number]) => Promise<CartModel | null>;
    setItemUpdating: (uid: string, state: boolean) => void;
}
/**
 * useCartItems hook
 *
 * Provides an API for managing and retrieving calculated cart items data, including price, subtotal, configuration, quantity updates, and error handling.
 *
 * @param {Object} params
 * @param {ReturnType<typeof useText>} params.dictionary - The i18n dictionary
 * @param {(item: CartModel['items'][number], quantity: number) => void} [params.onQuantityUpdate] - Callback when item quantity is updated
 * @param {(item: CartModel['items'][number]) => void} [params.onItemRemove] - Callback when item is removed
 *
 * @returns {Object} API for cart item management:
 *   - showIncludedTaxPrice: boolean
 *   - showExcludingTaxPrice: boolean
 *   - itemsUpdating: Map<string, ItemUpdateState>
 *   - itemUpdateErrors: Map<string, string>
 *   - getConfiguration(item): object | undefined
 *   - getPriceProps(item): PriceProps
 *   - getSubtotalProps(item): { subtotalProps: PriceProps, subtotalDiscountProps: PriceProps | null }
 *   - processQuantityChange(item, value): Promise<void>
 *   - debouncedQuantityChange(item, value): void
 *   - setItemsUpdating(map): void
 *   - getWarningMessage(item): string | undefined
 *   - setItemUpdateError(uid, error): void
 *   - handleRemoveItem(item): Promise<CartModel>
 *   - setItemUpdating(uid, state): void
 */
export declare const useCartItems: ({ dictionary, onQuantityUpdate, onItemRemove }: useCartItemsProps) => UseCartItemsApi;
export {};
//# sourceMappingURL=useCartItems.d.ts.map