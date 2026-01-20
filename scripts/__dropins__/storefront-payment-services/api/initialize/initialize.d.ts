import { Initializer } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';

export type ConfigProps = {
    /**
     * Adobe Commerce GraphQL API URL, e.g., "https://magento.test/graphql".
     * When not set, this defaults to "/graphql".
     */
    apiUrl?: string;
    /**
     * The Payment Services drop-in may send GraphQL requests on behalf of the shopper. This requires GraphQL
     * authorization, which can be performed using authorization tokens or session cookies.
     *
     * For token-based authorization, the "getCustomerToken" function should return a customer token as a string, or null
     * for guest checkouts. The "getCustomerToken" function should not be provided for session-based authorization.
     *
     * For more information, see: https://developer.adobe.com/commerce/webapi/graphql/usage/authorization-tokens/.
     */
    getCustomerToken?: (() => string | null) | null;
    /**
     * Adobe Commerce store view code on which the Payment Services drop-in should perform GraphQL requests.
     * When not set, no 'Store' header will be sent.
     */
    storeViewCode?: string;
    /**
     * Dictionary of language definitions for the Payment Services drop-in.
     */
    langDefinitions?: Record<'default' | Lang, object>;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map