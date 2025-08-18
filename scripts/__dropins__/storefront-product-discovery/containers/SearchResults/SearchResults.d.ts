import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { Scope, SearchVariables } from '../../data/models';
import { Product } from '../../data/models/product';

type SlotDefaultContext = {
    product: Product;
    variables: SearchVariables | null;
};
export interface SearchResultsProps extends HTMLAttributes<HTMLDivElement> {
    routeProduct?: (product: Product) => string;
    scope?: Scope;
    imageWidth?: number;
    imageHeight?: number;
    skeletonCount?: number;
    onSearchResult?: (payload: Product[]) => void;
    slots?: {
        ProductActions?: SlotProps<SlotDefaultContext>;
        ProductPrice?: SlotProps<SlotDefaultContext>;
        ProductName?: SlotProps<SlotDefaultContext>;
        ProductImage?: SlotProps<SlotDefaultContext & {
            defaultImageProps: ImageProps;
        }>;
        NoResults?: SlotProps<{
            error: string | null;
            variables: SearchVariables | null;
        }>;
        Header?: SlotProps<{
            products: Product[];
            variables: SearchVariables | null;
        }>;
        Footer?: SlotProps<{
            products: Product[];
            variables: SearchVariables | null;
        }>;
    };
}
export declare const SearchResults: Container<SearchResultsProps>;
export {};
//# sourceMappingURL=SearchResults.d.ts.map