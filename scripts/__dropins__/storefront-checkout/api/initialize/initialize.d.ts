import { Cart as CartModel, Customer as CustomerModel, ShippingMethod } from '../../data/models';
import { Filter, Selector } from '../../types/utils';
import { definition } from '@dropins/tools/types/elsie/src/i18n';
import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';

export type ConfigProps = {
    defaults?: {
        isBillToShipping?: boolean;
        selectedShippingMethod?: Selector<ShippingMethod>;
    };
    shipping?: {
        filterOptions?: Filter<ShippingMethod>;
    };
    features?: {
        b2b?: {
            quotes?: boolean;
            routeLogin?: () => string | void;
        };
    };
    langDefinitions?: typeof definition & {
        default: {
            Checkout: any;
        };
    };
    models?: {
        CartModel?: Model<CartModel>;
        CustomerModel?: Model<CustomerModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map