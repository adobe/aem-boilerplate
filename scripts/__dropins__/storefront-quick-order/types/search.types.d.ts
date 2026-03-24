import { AddAllToCartContext, OrderItem, ProductOptionsContext, ProductPriceContext, QuickOrderItemSearchContext, QuickOrderSearchAutocompleteItemContext } from '.';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib/slot';

export interface SearchItem {
    sku: string;
    [key: string]: any;
}
export interface SearchProps<T extends SearchItem = SearchItem> {
    t: Record<string, string>;
    value: string;
    onChange: (e: Event) => void;
    items: T[];
    shouldShowResults?: boolean;
    className?: string;
    onItemClick?: (item: T) => void;
    slots?: {
        AddAllToCartButton?: SlotProps<AddAllToCartContext>;
        ProductPrice?: SlotProps<ProductPriceContext>;
        ProductOptions?: SlotProps<ProductOptionsContext>;
        QuickOrderItemSearch?: SlotProps<QuickOrderItemSearchContext>;
        QuickOrderSearchAutocompleteItem?: SlotProps<QuickOrderSearchAutocompleteItemContext<T>>;
    };
}
export interface UseItemSearchProps {
    productsSearch?: (params: {
        phrase: string;
        filter: Array<{
            attribute: string;
            in: string[];
        }>;
    }) => Promise<{
        items: OrderItem[];
    }>;
    initialSku: string;
    replaceItemSku?: string;
    searchFilter?: Array<{
        attribute: string;
        in: string[];
    }>;
}
//# sourceMappingURL=search.types.d.ts.map