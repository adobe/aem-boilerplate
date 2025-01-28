import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { CustomerOrdersReturnModel, OrderDataModel, RequestReturnModel } from '../../data/models';

export type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        OrderDataModel?: Model<OrderDataModel>;
        CustomerOrdersReturnModel?: Model<CustomerOrdersReturnModel>;
        RequestReturnModel?: Model<RequestReturnModel>;
    };
    orderRef?: string;
    returnRef?: string;
    orderData?: OrderDataModel | null;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map