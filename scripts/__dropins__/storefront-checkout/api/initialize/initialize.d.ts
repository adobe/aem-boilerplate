import { Cart as CartModel, Customer as CustomerModel } from '../../data/models';
import { Lang } from '../../../@adobe-commerce/elsie/src/i18n';
import { Initializer, Model } from '../../../@adobe-commerce/elsie/src/lib';

export type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        CartModel?: Model<CartModel>;
        CustomerModel?: Model<CustomerModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('../../../@adobe-commerce/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map