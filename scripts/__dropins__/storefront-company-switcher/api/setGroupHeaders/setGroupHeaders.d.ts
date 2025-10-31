import { FetchGraphQL } from '@adobe-commerce/fetch-graphql';

/**
 * Manages customer group headers for GraphQL requests.
 * Singleton class that handles setting and removing group headers across multiple GraphQL modules.
 */
declare class GroupHeaderManager {
    private groupHeaderSet;
    private groupHeaderAppliers;
    private groupHeaderRemovers;
    private headerKey;
    constructor();
    /**
     * Sets the header key used for customer group identification
     * @param headerKey - The header name to use for group ID
     */
    setHeaderKey(headerKey: string): void;
    /**
     * Configures GraphQL modules that will have group headers applied
     * @param modules - Array of GraphQL modules with header management functions
     */
    setFetchGraphQlModules(modules: FetchGraphQL[]): void;
    /**
     * Sets customer group headers for all configured GraphQL modules.
     * Always removes existing headers first before setting new ones.
     * @param groupId - The group ID to set in headers, or null to only remove headers
     */
    setGroupHeaders(groupId: string | null): void;
    /**
     * Removes customer group headers from all configured GraphQL modules
     */
    removeGroupHeaders(): void;
    /**
     * Checks if customer group headers are currently set
     * @returns true if group headers are set, false otherwise
     */
    isGroupHeaderSet(): boolean;
}
/**
 * Gets the singleton instance of GroupHeaderManager
 * @returns The GroupHeaderManager instance
 */
export declare const getGroupHeaderManager: () => GroupHeaderManager;
export {};
//# sourceMappingURL=setGroupHeaders.d.ts.map