import { ProductSearchResult, Scope, SearchVariables } from '../../data/models';

type SearchOptions = {
    scope?: Scope;
};
export declare const search: (request: SearchVariables | null, options?: SearchOptions) => Promise<ProductSearchResult>;
export {};
//# sourceMappingURL=search.d.ts.map