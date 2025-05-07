import { Initializer, Model } from '../../../@adobe-commerce/elsie/src/lib';
import { Lang } from '../../../@adobe-commerce/elsie/src/i18n';
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
export declare const config: import('../../../@adobe-commerce/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map