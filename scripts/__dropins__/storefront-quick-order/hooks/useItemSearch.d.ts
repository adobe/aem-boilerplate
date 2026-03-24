import { OrderItem, UseItemSearchProps } from '../types';

export declare const useItemSearch: ({ productsSearch, initialSku, replaceItemSku, searchFilter, }: UseItemSearchProps) => {
    searchValue: string;
    searchResults: OrderItem[];
    handleSearchChange: (e: Event) => void;
    shouldShowResults: boolean;
    resetSearch: () => void;
    handleItemClick: (clickedItem: OrderItem) => void;
};
//# sourceMappingURL=useItemSearch.d.ts.map