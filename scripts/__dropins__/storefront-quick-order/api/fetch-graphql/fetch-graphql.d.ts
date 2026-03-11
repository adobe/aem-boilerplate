export declare const setEndpoint: (endpoint: string) => void, setFetchGraphQlHeader: (key: string, value: string | null) => void, removeFetchGraphQlHeader: (key: string) => void, setFetchGraphQlHeaders: (header: import('@adobe-commerce/fetch-graphql').Header | ((prev: import('@adobe-commerce/fetch-graphql').Header) => import('@adobe-commerce/fetch-graphql').Header)) => void, fetchGraphQl: <T = any>(query: string, options?: import('@adobe-commerce/fetch-graphql').FetchOptions | undefined) => Promise<{
    errors?: import('@adobe-commerce/fetch-graphql').FetchQueryError | undefined;
    data: T;
}>, getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: import('@adobe-commerce/fetch-graphql').Header;
};
//# sourceMappingURL=fetch-graphql.d.ts.map