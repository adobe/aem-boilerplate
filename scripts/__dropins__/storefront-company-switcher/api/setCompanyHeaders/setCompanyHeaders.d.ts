import { FetchGraphQL } from '@adobe-commerce/fetch-graphql';

declare class CompanyHeaderManager {
    private companyHeaderSet;
    private companyHeaderAppliers;
    private companyHeaderRemovers;
    private headerKey;
    constructor();
    setHeaderKey(headerKey: string): void;
    setFetchGraphQlModules(modules: FetchGraphQL[]): void;
    setCompanyHeaders(companyId: string | null): void;
    removeCompanyHeaders(): void;
    isCompanyHeaderSet(): boolean;
}
export declare const getCompanyHeaderManager: () => CompanyHeaderManager;
export {};
//# sourceMappingURL=setCompanyHeaders.d.ts.map