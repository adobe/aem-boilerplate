import { FetchGraphQL } from '@adobe-commerce/fetch-graphql';

declare class GroupHeaderManager {
    private groupHeaderSet;
    private groupHeaderAppliers;
    private groupHeaderRemovers;
    private headerKey;
    constructor();
    setHeaderKey(headerKey: string): void;
    setFetchGraphQlModules(modules: FetchGraphQL[]): void;
    setGroupHeaders(groupId: string | null): void;
    removeGroupHeaders(): void;
    isGroupHeaderSet(): boolean;
}
export declare const getGroupHeaderManager: () => GroupHeaderManager;
export {};
//# sourceMappingURL=setGroupHeaders.d.ts.map