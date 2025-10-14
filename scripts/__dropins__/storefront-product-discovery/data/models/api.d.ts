import { Product } from './product';

export type Scope = 'search' | 'popover' | string;
export interface SearchVariables {
    scope?: Scope;
    phrase?: string;
    filter?: SearchFilter[];
    sort?: SortOrder[];
    currentPage?: number;
    pageSize?: number;
    context?: SearchContext;
}
export interface SearchContext {
    customerGroup?: string;
    userViewHistory?: ViewHistoryRecord[];
}
export interface ViewHistoryRecord {
    sku: string;
    dateTime: string;
}
export interface SearchFilter {
    attribute: string;
    contains?: string;
    in?: string[];
    eq?: string;
    range?: {
        from: number;
        to: number;
    };
    startsWith?: string;
}
export interface SortOrder {
    attribute: string;
    direction: 'ASC' | 'DESC';
}
export interface RefineOption {
    label: string;
    attribute: string;
    numeric: boolean;
    bidirectional: boolean;
}
export interface ProductSearchResponse {
    productSearch: ProductSearchResult;
}
export interface ProductSearchResult {
    facets: SearchFacet[];
    items: Product[];
    pageInfo: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        pageSize: number;
    };
    suggestions?: string[];
    totalCount: number;
    metadata?: {
        filterableAttributes: RefineOption[];
        sortableAttributes: RefineOption[];
    };
}
export interface SearchFacet {
    title: string;
    attribute: string;
    buckets: FacetBucket[];
}
export interface FacetBucket {
    title: string;
    count: number;
    __typename: string;
    from?: number;
    to?: number;
    selected?: boolean;
}
export interface AttributeMetadataResponse {
    attributeMetadata: AttributeMetadata;
}
export interface AttributeMetadata {
    sortable: RefineOption[];
    filterableInSearch: RefineOption[];
}
//# sourceMappingURL=api.d.ts.map