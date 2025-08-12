import { Initializer } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';

type ConfigProps = {
    langDefinitions?: Lang;
    isGuestWishlistEnabled?: boolean;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map