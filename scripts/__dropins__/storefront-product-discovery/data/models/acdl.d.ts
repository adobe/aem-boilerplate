export interface SearchInput {
    units: Array<SearchInputUnit>;
}
export interface SearchInputUnit {
    searchUnitId: string;
    searchRequestId: string;
    queryTypes: Array<'products' | 'suggestions' | 'categories'>;
    phrase: string;
    pageSize: number;
    currentPage: number;
    filter: Array<SearchFilter>;
    sort: Array<SearchSort>;
    context?: QueryContextInput;
}
export interface QueryContextInput {
    customerGroup: string;
}
export interface SearchFilter {
    attribute: string;
    eq?: string;
    in?: Array<string>;
    range?: {
        from?: number;
        to?: number;
    };
}
export interface SearchSort {
    attribute: string;
    direction: 'ASC' | 'DESC';
}
export interface SearchResults {
    units: Array<SearchResultUnit>;
}
export interface SearchResultUnit {
    searchUnitId: string;
    searchRequestId: string;
    rankingType?: string;
    trendingWindow?: string;
    executionTime?: number;
    products: Array<SearchResultProduct>;
    categories: Array<SearchResultCategory>;
    suggestions: Array<SearchResultSuggestion>;
    page: number;
    perPage: number;
    facets: Array<SearchFacetContext> | null;
}
export interface SearchResultProduct {
    name: string;
    sku: string;
    url: string;
    imageUrl: string;
    price?: number;
    rank: number;
}
export interface SearchResultCategory {
    name: string;
    url: string;
    rank: number;
}
export interface SearchResultSuggestion {
    suggestion: string;
    rank: number;
}
export interface SearchFacetContext {
    attribute: string;
    buckets: Array<SearchBucket>;
    title: string;
    type?: 'PINNED' | 'INTELLIGENT' | 'POPULAR';
}
export type SearchBucket = RangeBucket | ScalarBucket | StatsBucket;
export interface RangeBucket {
    count: number;
    from: number;
    title: string;
    to?: number;
}
export interface ScalarBucket {
    count: number;
    title: string;
}
export interface StatsBucket {
    min: number;
    max: number;
    title: string;
}
//# sourceMappingURL=acdl.d.ts.map