import { FetchGraphQL } from '@adobe-commerce/fetch-graphql';

/**
 * Manages company-specific headers for GraphQL requests.
 * Singleton class that handles setting and removing company headers across multiple GraphQL modules.
 */
declare class CompanyHeaderManager {
    private companyHeaderSet;
    private companyHeaderAppliers;
    private companyHeaderRemovers;
    private headerKey;
    constructor();
    /**
     * Sets the header key used for company identification
     * @param headerKey - The header name to use for company ID
     */
    setHeaderKey(headerKey: string): void;
    /**
     * Configures GraphQL modules that will have company headers applied
     * @param modules - Array of GraphQL modules with header management functions
     */
    setFetchGraphQlModules(modules: FetchGraphQL[]): void;
    /**
     * Sets company headers for all configured GraphQL modules
     * @param companyId - The company ID to set in headers, or null to remove headers
     */
    setCompanyHeaders(companyId: string | null): void;
    /**
     * Removes company headers from all configured GraphQL modules
     */
    removeCompanyHeaders(): void;
    /**
     * Checks if company headers are currently set
     * @returns true if company headers are set, false otherwise
     */
    isCompanyHeaderSet(): boolean;
}
/**
 * Gets the singleton instance of CompanyHeaderManager
 * @returns The CompanyHeaderManager instance
 */
export declare const getCompanyHeaderManager: () => CompanyHeaderManager;
export {};
//# sourceMappingURL=setCompanyHeaders.d.ts.map