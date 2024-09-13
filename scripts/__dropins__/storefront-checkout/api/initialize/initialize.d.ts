import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { Initializer } from '@dropins/tools/types/elsie/src/lib';

export type ConfigProps = {
    guestViewCookieExpirationDays?: number;
    langDefinitions?: Lang;
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
//# sourceMappingURL=initialize.d.ts.map