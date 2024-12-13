import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { CustomerOrdersReturnModel, OrderDataModel, RequestReturnModel } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        OrderDataModel?: Model<OrderDataModel>;
        CustomerOrdersReturnModel?: Model<CustomerOrdersReturnModel>;
        RequestReturnModel?: Model<RequestReturnModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map