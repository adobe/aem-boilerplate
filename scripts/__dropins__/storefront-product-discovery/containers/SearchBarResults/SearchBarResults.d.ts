import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { Product } from '../../data/models/product';

export interface SearchBarResultsProps extends HTMLAttributes<HTMLDivElement> {
    products?: Product[];
    routeSearch?: (searchQuery: string) => void;
    slots?: {
        ProductImage?: SlotProps;
        ProductName?: SlotProps;
        ProductPrice?: SlotProps;
    };
}
export declare const SearchBarResults: Container<SearchBarResultsProps>;
//# sourceMappingURL=SearchBarResults.d.ts.map