export declare const setEndpoint: (endpoint: string) => void, setFetchGraphQlHeader: (key: string, value: string | null) => void, removeFetchGraphQlHeader: (key: string) => void, setFetchGraphQlHeaders: (header: import('@adobe/fetch-graphql').Header) => void, fetchGraphQl: <T = any>(query: string, options?: import('@adobe/fetch-graphql').FetchOptions | undefined) => Promise<{
    errors?: import('@adobe/fetch-graphql').FetchQueryError | undefined;
    data: T;
}>, getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: import('@adobe/fetch-graphql').Header | undefined;
};
export type { FetchOptions, FetchQueryError } from '@adobe/fetch-graphql';
//# sourceMappingURL=fetch-graphql.d.ts.map