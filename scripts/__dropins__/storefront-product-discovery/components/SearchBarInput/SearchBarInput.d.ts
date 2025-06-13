import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface SearchBarInputProps extends HTMLAttributes<HTMLDivElement> {
    searchIcon?: VNode;
    searchQuery?: string;
    defaultQueryPlaceholder?: string;
    isLoading?: boolean;
    error?: string | null;
    onQueryInput?: (query: string) => void;
    onExecuteSearch?: (query: string) => void;
    onClose?: () => void;
}
export declare const SearchBarInput: FunctionComponent<SearchBarInputProps>;
//# sourceMappingURL=SearchBarInput.d.ts.map