import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';

export interface SearchBarInputProps extends HTMLAttributes<HTMLDivElement> {
    searchQuery?: string;
    minimumQueryLength?: number;
    debounceDelay?: number;
    defaultQueryPlaceholder?: string;
    routeSearch?: (searchQuery: string) => void;
    slots?: {
        InputForm?: SlotProps;
        SearchIcon?: SlotProps;
    };
}
export declare const SearchBarInput: Container<SearchBarInputProps>;
//# sourceMappingURL=SearchBarInput.d.ts.map