import { Initializer } from '@dropins/tools/types/elsie/src/lib';
import { Lang } from '@dropins/tools/types/elsie/src/i18n';
import { FetchGraphQL } from '@adobe-commerce/fetch-graphql';

type ConfigProps = {
    langDefinitions?: Lang;
    companyHeader: string;
    customerGroupHeader: string;
    companySessionStorageKey: string;
    groupSessionStorageKey: string;
    fetchGraphQlModules: FetchGraphQL[];
    groupGraphQlModules: FetchGraphQL[];
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import('@dropins/tools/types/elsie/src/lib').Config<ConfigProps>;
export {};
//# sourceMappingURL=initialize.d.ts.map