import { FetchGraphQL } from '@adobe-commerce/fetch-graphql';
import { Initializer } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';

/**
 * Configuration properties for the company switcher initialization
 */
interface ConfigProps {
    /** Optional language definitions for internationalization */
    langDefinitions?: Lang;
    /** HTTP header name for company identification */
    companyHeader: string;
    /** HTTP header name for customer group identification */
    customerGroupHeader: string;
    /** Session storage key for persisting company context */
    companySessionStorageKey: string;
    /** Session storage key for persisting group context */
    groupSessionStorageKey: string;
    /** GraphQL modules that will have company headers applied */
    fetchGraphQlModules: FetchGraphQL[];
    /** GraphQL modules that will have group headers applied */
    groupGraphQlModules: FetchGraphQL[];
}
/**
 * Initializer for the company switcher drop-in.
 * Configures headers, storage, and GraphQL modules for company management.
 */
export declare const initialize: Initializer<ConfigProps>;
/**
 * Configuration object for getting and setting company switcher configuration.
 * Provides methods to access and update the current configuration.
 */
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map