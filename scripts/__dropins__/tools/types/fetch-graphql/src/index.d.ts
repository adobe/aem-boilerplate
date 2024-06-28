export type Header = {
    [key: string]: string | null;
};
export type FetchOptions = {
    method?: 'GET' | 'POST';
    variables?: {
        [key: string]: any;
    };
    signal?: AbortSignal;
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
};
export type FetchQueryError = Array<{
    message: string;
    extensions: {
        category: string;
    };
}>;
declare class FetchGraphQLMesh {
    _endpoint?: string;
    get endpoint(): string | undefined;
    get fetchGraphQlHeaders(): Header | undefined;
    _fetchGraphQlHeaders: Header | undefined;
    /**
     * Sets the GraphQL endpoint.
     * @param endpoint - The GraphQL endpoint.
     */
    setEndpoint(endpoint: string): void;
    /**
     * Sets the GraphQL headers.
     * @param key - The key of the header.
     * @param value - The value of the header.
     */
    setFetchGraphQlHeader(key: string, value: string | null): void;
    /**
     * Removes a specific GraphQL header.
     * @param key - The key of the header.
     */
    removeFetchGraphQlHeader(key: string): void;
    /**
     * Sets the GraphQL headers.
     * @param header - The header object.
     */
    setFetchGraphQlHeaders(header: Header): void;
    /**
     * Fetches GraphQL data.
     * @param query - The GraphQL query.
     * @param options - Optional configuration for the fetch request.
     * @returns
     */
    fetchGraphQl<T = any>(query: string, options?: FetchOptions): Promise<{
        errors?: FetchQueryError;
        data: T;
    }>;
    /**
     * Gets the configuration.
     */
    getConfig(): {
        endpoint: string | undefined;
        fetchGraphQlHeaders: Header | undefined;
    };
    getMethods(): {
        setEndpoint: (endpoint: string) => void;
        setFetchGraphQlHeader: (key: string, value: string | null) => void;
        removeFetchGraphQlHeader: (key: string) => void;
        setFetchGraphQlHeaders: (header: Header) => void;
        fetchGraphQl: <T = any>(query: string, options?: FetchOptions | undefined) => Promise<{
            errors?: FetchQueryError | undefined;
            data: T;
        }>;
        getConfig: () => {
            endpoint: string | undefined;
            fetchGraphQlHeaders: Header | undefined;
        };
    };
}
/**
 * `FetchGraphQL` is a class that extends `FetchGraphQLMesh`.
 * It provides methods to get the GraphQL endpoint and headers.
 *
 * @class
 *
 */
export declare class FetchGraphQL extends FetchGraphQLMesh {
    get endpoint(): string | undefined;
    get fetchGraphQlHeaders(): Header;
}
/**
 * Exports several methods from the `mesh` object.
 *
 * @property {Function} setEndpoint - Sets the GraphQL endpoint.
 * @property {Function} setFetchGraphQlHeaders - Sets the GraphQL headers.
 * @property {Function} setFetchGraphQlHeader - Sets a specific GraphQL header.
 * @property {Function} removeFetchGraphQlHeader - Removes a specific GraphQL header.
 * @property {Function} fetchGraphQl - Fetches GraphQL data.
 * @property {Function} getConfig - Gets the configuration.
 */
export declare const setEndpoint: (endpoint: string) => void, setFetchGraphQlHeaders: (header: Header) => void, setFetchGraphQlHeader: (key: string, value: string | null) => void, removeFetchGraphQlHeader: (key: string) => void, fetchGraphQl: <T = any>(query: string, options?: FetchOptions) => Promise<{
    errors?: FetchQueryError | undefined;
    data: T;
}>, getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: Header | undefined;
};
export {};
//# sourceMappingURL=index.d.ts.map