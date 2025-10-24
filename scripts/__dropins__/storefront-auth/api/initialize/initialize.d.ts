import { Initializer, Model, Config } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { CustomerModel } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    authHeaderConfig: {
        header: string;
        tokenPrefix: string;
    };
    onCustomerGroup?: (groupUid: string) => void;
    models?: {
        CustomerModel?: Model<CustomerModel>;
    };
};
export declare const DEFAULT_CUSTOMER_GROUP_ID = "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c";
export declare const initialize: Initializer<ConfigProps>;
export declare const config: Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map