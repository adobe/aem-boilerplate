import { Initializer, Model } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { RecommendationUnitModel } from '../../data/models';

type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        RecommendationUnitModel?: Model<RecommendationUnitModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map