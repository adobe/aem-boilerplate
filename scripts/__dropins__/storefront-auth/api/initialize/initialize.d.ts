import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { CustomerModel } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    authHeaderConfig: {
        header: string;
        tokenPrefix: string;
    };
    models?: {
        CustomerModel?: Model<CustomerModel>;
    };
};
/**
 * Default customer group ID for Not Logged In (NLI) users.
 * This value is emitted via the 'auth/group-uid' event when:
 * - A user is not authenticated
 * - Token verification fails
 * - User logs out
 */
export declare const DEFAULT_NLI_CUSTOMER_GROUP_ID = "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c";
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map