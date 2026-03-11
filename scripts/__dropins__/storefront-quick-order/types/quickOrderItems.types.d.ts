import { SlotProps } from '@dropins/tools/types/elsie/src/lib/slot';
import { SearchItem } from './search.types';

export type AddAllToCartContext = {
    handleAddToCart: (() => void) | undefined;
    clearItems: (() => void) | undefined;
    loading?: boolean;
    isDisabledButton?: boolean;
};
export type QuickOrderItemSearchContext = {
    item: OrderItem;
    scope: string;
    handleSearchChange: (e: Event) => void;
    searchResults: OrderItem[];
    searchValue: string;
    shouldShowResults: boolean;
    handleItemClick: (item: OrderItem) => void;
};
export type QuickOrderSearchAutocompleteItemContext<T extends SearchItem = SearchItem> = {
    item: T;
    index: number;
    activeIndex: number;
    createItemClickHandler: (item: T) => () => void;
};
export type ProductPriceContext = {
    item: OrderItem;
    scope: string;
};
export type ProductOptionsContext = {
    item: OrderItem;
    scope: string;
};
export interface ProductImage {
    url: string;
    label: string;
    roles: string[];
}
export interface ProductPrice {
    regular?: {
        amount?: number;
        currency?: string;
        variant?: string;
    };
    final: {
        amount?: number;
        minimumAmount?: number;
        maximumAmount?: number;
        currency: string;
        variant?: string;
    };
    tiers: Array<unknown>;
    visible: boolean;
}
export interface ProductAttribute {
    id: string;
    label: string;
    value: string;
}
export interface ProductOptionItem {
    id: string;
    inStock: boolean;
    label: string;
    selected: boolean;
    value: string;
}
export interface ProductOption {
    id: string;
    type: string;
    typename: string;
    label: string;
    required: boolean;
    multiple: boolean;
    items: ProductOptionItem[];
}
export interface ProductData {
    name: string;
    sku: string;
    isBundle: boolean;
    addToCartAllowed: boolean;
    inStock: boolean;
    shortDescription: string;
    metaDescription: string;
    metaKeyword: string;
    metaTitle: string;
    description: string;
    images: ProductImage[];
    prices: ProductPrice;
    attributes: ProductAttribute[];
    options: ProductOption[];
    optionUIDs?: string[];
    url: string;
    urlKey: string;
    externalId: string;
    productType: string;
}
export interface OrderItemInput {
    sku: string;
    variantSku?: string;
    quantity?: number;
    replaceItemSku?: string;
}
export interface OrderItem extends ProductData {
    id?: string;
    variantSku?: string;
    sku: string;
    quantity: number;
}
export interface QuickOrderItemsProps {
    className?: string;
    getProductsData?: (items: OrderItemInput[]) => Promise<OrderItem[]>;
    productsSearch?: (params: {
        phrase: string;
        filter: Array<{
            attribute: string;
            in: string[];
        }>;
    }) => Promise<{
        items: OrderItem[];
    }>;
    handleAddToCart?: (items: any[], clearItems: () => void) => void | string | Promise<void | string>;
    searchFilter?: Array<{
        attribute: string;
        in: string[];
    }>;
    slots?: {
        AddAllToCartButton?: SlotProps<AddAllToCartContext>;
        ProductPrice?: SlotProps<ProductPriceContext>;
        ProductOptions?: SlotProps<ProductOptionsContext>;
        QuickOrderItemSearch?: SlotProps<QuickOrderItemSearchContext>;
        QuickOrderSearchAutocompleteItem?: SlotProps<QuickOrderSearchAutocompleteItemContext<OrderItem>>;
    };
}
export interface QuickOrderItemProps {
    item: OrderItem;
    index: number;
    t: Record<string, string>;
    onRemove: (sku: string) => void;
    slots?: QuickOrderItemsProps['slots'];
    scope: string;
}
export interface QuickOrderListItemProps {
    item: OrderItem;
    t: Record<string, string>;
    onRemove: (sku: string) => void;
    onUpdateQuantity?: (sku: string, quantity: number) => void;
    isUpdating?: boolean;
    loading?: boolean;
    productsSearch?: (params: {
        phrase: string;
        filter: Array<{
            attribute: string;
            in: string[];
        }>;
    }) => Promise<{
        items: OrderItem[];
    }>;
    searchFilter?: Array<{
        attribute: string;
        in: string[];
    }>;
    slots?: {
        AddAllToCartButton?: SlotProps<AddAllToCartContext>;
        ProductPrice?: SlotProps<ProductPriceContext>;
        ProductOptions?: SlotProps<ProductOptionsContext>;
        QuickOrderItemSearch?: SlotProps<QuickOrderItemSearchContext>;
    };
}
export interface QuickOrderItemsListProps {
    t: Record<string, string>;
    items: OrderItem[];
    onRemove: (sku: string) => void;
    clearItems?: () => void;
    onUpdateQuantity?: (sku: string, quantity: number) => void;
    handleAddToCart?: () => void;
    isItemUpdating?: (sku: string) => boolean;
    setDisabledCartButton?: (disabled: boolean) => void;
    productsSearch?: (params: {
        phrase: string;
        filter: Array<{
            attribute: string;
            in: string[];
        }>;
    }) => Promise<{
        items: OrderItem[];
    }>;
    searchFilter?: Array<{
        attribute: string;
        in: string[];
    }>;
    slots?: QuickOrderItemsProps['slots'];
    loading?: boolean;
    isDisabledButton?: boolean;
}
export interface UseQuickOrderItemsProps extends Omit<QuickOrderItemsProps, 'className'> {
    getProductsData?: (items: OrderItemInput[]) => Promise<OrderItem[]>;
}
export interface UseQuickOrderItemsReturn {
    items: OrderItem[];
    loading: boolean;
    removeItem: (sku: string) => void;
    clearItems: () => void;
    updateItemQuantity: (sku: string, quantity: number) => void;
    addToCart: () => void;
    isItemUpdating: (sku: string) => boolean;
    isDisabledButton: boolean;
    setDisabledCartButton: (disabled: boolean) => void;
    notification: {
        type: 'validation' | 'partial-success' | 'success' | 'backend-error';
        variant: 'success' | 'warning' | 'neutral' | 'brand';
        message: string;
        details?: string;
        count?: number;
        clickableSkus?: string[];
    } | null;
    dismissNotification: () => void;
}
//# sourceMappingURL=quickOrderItems.types.d.ts.map