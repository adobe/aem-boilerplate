import { default as React } from 'preact/compat';
import { SearchItem } from '../types/search.types';

export interface UseSearchOptions<T extends SearchItem> {
    value: string;
    onChange?: (e: any) => void;
    items: T[];
    shouldShowResults?: boolean;
    onItemClick?: (item: T) => void;
}
export interface UseSearchReturn<T extends SearchItem> {
    activeIndex: number;
    showResults: boolean;
    showEmptyState: boolean;
    resultsId: React.MutableRefObject<string>;
    inputRef: React.RefObject<HTMLInputElement>;
    itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    containerRef: React.RefObject<HTMLDivElement>;
    handleChange: (e: any) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    createItemClickHandler: (item: T) => () => void;
    getActiveDescendant: () => string | undefined;
}
export declare const useSearch: <T extends SearchItem = SearchItem>({ value, onChange, items, shouldShowResults, onItemClick, }: UseSearchOptions<T>) => UseSearchReturn<T>;
//# sourceMappingURL=useSearch.d.ts.map