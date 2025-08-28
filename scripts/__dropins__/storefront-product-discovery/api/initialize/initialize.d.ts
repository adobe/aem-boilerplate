import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { Product } from '../../data/models/product';
import { ProductSearchResult } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        Product?: Model<Product>;
        ProductSearchResult?: Model<ProductSearchResult>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map