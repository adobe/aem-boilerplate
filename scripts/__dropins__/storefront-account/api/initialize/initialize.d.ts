import { Initializer, Model } from '../../../@adobe-commerce/elsie/src/lib';
import { Lang } from '../../../@adobe-commerce/elsie/src/i18n';
import { OrderHistoryModel } from '../../data/models';
import { CustomerDataModelShort } from '../../data/models/customer';

type ConfigProps = {
    langDefinitions?: Lang;
    authHeaderConfig?: {
        header?: string;
        tokenPrefix?: string;
    };
    models?: {
        OrderHistoryModel?: Model<OrderHistoryModel>;
        CustomerDataModelShort?: Model<CustomerDataModelShort>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('../../../@adobe-commerce/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map