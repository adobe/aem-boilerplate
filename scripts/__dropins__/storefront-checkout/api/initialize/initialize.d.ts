import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';
import { Cart as CartModel, Customer as CustomerModel, Order as OrderModel } from '../../data/models';

export type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        CartModel?: Model<CartModel>;
        CustomerModel?: Model<CustomerModel>;
        OrderModel?: Model<OrderModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map