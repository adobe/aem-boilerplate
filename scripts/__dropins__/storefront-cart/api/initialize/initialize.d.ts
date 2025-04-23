import { Initializer, Model } from '../../../@adobe-commerce/elsie/src/lib';
import { Lang } from '../../../@adobe-commerce/elsie/src/i18n';
import { CartModel } from '../../data/models';

type ConfigProps = {
    disableGuestCart?: boolean;
    langDefinitions?: Lang;
    models?: {
        CartModel?: Model<CartModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('../../../@adobe-commerce/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map