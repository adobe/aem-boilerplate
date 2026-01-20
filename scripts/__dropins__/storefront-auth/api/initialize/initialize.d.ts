import { Initializer, Model, Config } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { CustomerModel } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    authHeaderConfig: {
        header: string;
        tokenPrefix: string;
    };
    customerPermissionRoles?: boolean;
    adobeCommerceOptimizer?: boolean;
    models?: {
        CustomerModel?: Model<CustomerModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map