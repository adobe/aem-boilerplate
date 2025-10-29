/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
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
export type BeforeHook = (requestInit: RequestInit) => RequestInit;
export type AfterHook<T = any> = (requestInit: RequestInit, response: {
    errors?: FetchQueryError;
    data: T;
}) => {
    errors?: FetchQueryError;
    data: T;
};
declare class FetchGraphQLMesh {
    protected _endpoint?: string;
    _fetchGraphQlHeaders: Header;
    _beforeHooks: BeforeHook[];
    _afterHooks: AfterHook[];
    get endpoint(): string | undefined;
    get fetchGraphQlHeaders(): Header;
    /**
     * Sets the GraphQL endpoint.
     * @param endpoint - The GraphQL endpoint URL string.
     * @example
     * ```js
     * // Set endpoint as string
     * instance.setEndpoint('https://api.example.com/graphql');
     * ```
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
     * Gets the value of a specific GraphQL header.
     * @param key - The key of the header.
     * @returns The value of the header, or undefined if not found.
     */
    getFetchGraphQlHeader(key: string): string | null | undefined;
    /**
     * Sets the GraphQL headers.
     * @param header - The header object or a function that returns a header object.
     * If a function is provided, it will be called with the previous headers.
     * The returned object will be merged with the previous headers.
     * @example
     * ```js
     * // set headers
     * setFetchGraphQlHeaders({ test: 'test' });
     *
     * // merge with previous headers
     * setFetchGraphQlHeaders((prev) => ({
     *   ...prev,
     *  test: 'test2',
     * }));
     * ```
     */
    setFetchGraphQlHeaders(header: Header | ((prev: Header) => Header)): void;
    /**
     * Adds a hook executed before the GraphQL call.
     * @param hook - The hook function.
     * @example
     * ```js
     * // add before hook
     * addBeforeHook((requestInit) => console.log('About to execute ' + requestInit.method + ' call.'));
     *
     * // modify the requestInit before executing the request
     * addBeforeHook((requestInit) => {method: requestInit.method, body: 'new body'});
     * ```
     */
    addBeforeHook(hook: BeforeHook): void;
    /**
     * Adds a hook executed before the GraphQL call.
     * @param hook - The hook function.
     * @example
     * ```js
     * // add before hook
     * addAfterHook((requestInit, response) => console.log(
     *     'The result of ' + requestInit.method + ' call is ' + response.json().body
     * ));
     *
     * // modify the response
     * addAfterHook((requestInit, response) => new Response(JSON.stringify({ ...response, modified: true }));
     * ```
     */
    addAfterHook(hook: AfterHook): void;
    /**
     * Collects all before hooks. Can be overridden by subclasses for inheritance.
     * @protected
     */
    protected _collectBeforeHooks(): BeforeHook[];
    /**
     * Collects all after hooks. Can be overridden by subclasses for inheritance.
     * @protected
     */
    protected _collectAfterHooks(): AfterHook[];
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
        fetchGraphQlHeaders: Header;
    };
    getMethods(): {
        setEndpoint: (endpoint: string) => void;
        setFetchGraphQlHeader: (key: string, value: string | null) => void;
        getFetchGraphQlHeader: (key: string) => string | null | undefined;
        removeFetchGraphQlHeader: (key: string) => void;
        setFetchGraphQlHeaders: (header: Header | ((prev: Header) => Header)) => void;
        fetchGraphQl: <T = any>(query: string, options?: FetchOptions | undefined) => Promise<{
            errors?: FetchQueryError | undefined;
            data: T;
        }>;
        getConfig: () => {
            endpoint: string | undefined;
            fetchGraphQlHeaders: Header;
        };
        addBeforeHook: (hook: BeforeHook) => void;
        addAfterHook: (hook: AfterHook<any>) => void;
    };
}
/**
 * `FetchGraphQL` is a class that extends `FetchGraphQLMesh`.
 * It provides methods to get the GraphQL endpoint and headers with support for inheritance.
 *
 * @class
 *
 */
export declare class FetchGraphQL extends FetchGraphQLMesh {
    private _mode;
    private _source?;
    get endpoint(): string | undefined;
    get fetchGraphQlHeaders(): Header;
    /**
     * Sets the GraphQL endpoint or links to another FetchGraphQL instance.
     * @param endpoint - The GraphQL endpoint URL string, or a FetchGraphQL instance to link to.
     * @example
     * ```js
     * // Set endpoint as string
     * instance.setEndpoint('https://api.example.com/graphql');
     *
     * // Link to another instance
     * const parent = new FetchGraphQL();
     * parent.setEndpoint('https://api.example.com/graphql');
     *
     * const child = new FetchGraphQL();
     * child.setEndpoint(parent); // Links to parent, shares endpoint, headers, and hooks
     * ```
     */
    setEndpoint(endpoint: string | FetchGraphQL): void;
    /**
     * Sets a GraphQL header. When linked to another instance, this sets the header on the linked instance.
     * @param key - The key of the header.
     * @param value - The value of the header.
     */
    setFetchGraphQlHeader(key: string, value: string | null): void;
    /**
     * Sets the GraphQL headers. When linked to another instance, this sets the headers on the linked instance.
     * @param header - The header object or a function that returns a header object.
     */
    setFetchGraphQlHeaders(header: Header | ((prev: Header) => Header)): void;
    /**
     * Removes a specific GraphQL header. When linked to another instance, this removes the header from the linked instance.
     * @param key - The key of the header.
     */
    removeFetchGraphQlHeader(key: string): void;
    /**
     * Gets the value of a specific GraphQL header. When linked to another instance, this gets the header from the linked instance.
     * @param key - The key of the header.
     * @returns The value of the header, or undefined if not found.
     */
    getFetchGraphQlHeader(key: string): string | null | undefined;
    /**
     * Adds a before hook. When linked to another instance, this adds the hook to the linked instance.
     * @param hook - The hook function.
     */
    addBeforeHook(hook: BeforeHook): void;
    /**
     * Adds an after hook. When linked to another instance, this adds the hook to the linked instance.
     * @param hook - The hook function.
     */
    addAfterHook(hook: AfterHook): void;
    /**
     * Collects all before hooks. When linked, delegates to the linked instance.
     * @protected
     */
    protected _collectBeforeHooks(): BeforeHook[];
    /**
     * Collects all after hooks. When linked, delegates to the linked instance.
     * @protected
     */
    protected _collectAfterHooks(): AfterHook[];
}
/**
 * Exports several methods from the `mesh` object.
 *
 * @property {Function} setEndpoint - Sets the GraphQL endpoint.
 * @property {Function} setFetchGraphQlHeaders - Sets the GraphQL headers.
 * @property {Function} setFetchGraphQlHeader - Sets a specific GraphQL header.
 * @property {Function} getFetchGraphQlHeader - Gets the value of a specific GraphQL header.
 * @property {Function} removeFetchGraphQlHeader - Removes a specific GraphQL header.
 * @property {Function} fetchGraphQl - Fetches GraphQL data.
 * @property {Function} getConfig - Gets the configuration.
 * @property {Function} addBeforeHook - Adds a hook executed before the GraphQL call.
 * @property {Function} addAfterHook - Adds a hook executed after the GraphQL call.
 */
export declare const setEndpoint: (endpoint: string) => void, setFetchGraphQlHeaders: (header: Header | ((prev: Header) => Header)) => void, setFetchGraphQlHeader: (key: string, value: string | null) => void, getFetchGraphQlHeader: (key: string) => string | null | undefined, removeFetchGraphQlHeader: (key: string) => void, fetchGraphQl: <T = any>(query: string, options?: FetchOptions) => Promise<{
    errors?: FetchQueryError | undefined;
    data: T;
}>, getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: Header;
}, addBeforeHook: (hook: BeforeHook) => void, addAfterHook: (hook: AfterHook) => void;
export {};
//# sourceMappingURL=index.d.ts.map