import { Initializer } from '../../../@adobe-commerce/elsie/src/lib';
import { Lang } from '../../../@adobe-commerce/elsie/src/i18n';
import { ProductModel } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    defaultLocale?: string;
    sku?: string;
    acdl?: boolean;
    anchors?: string[];
    persistURLParams?: boolean;
    preselectFirstOption?: boolean;
    optionsUIDs?: string[];
    models?: {
        [name: string]: {
            initialData: any;
            /** @deprecated Use "transformer" instead */
            transform?: (data?: ProductModel) => ProductModel;
            transformer?: (data?: ProductModel) => ProductModel;
            fallbackData?: (parentProduct: any, simpleProduct: ProductModel) => ProductModel;
        };
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('../../../@adobe-commerce/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map