/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
/**
 * GraphQL client methods for making API requests.
 * Provides methods to configure endpoints, headers, and execute GraphQL queries.
 */
export declare const 
/** Sets the GraphQL endpoint URL */
setEndpoint: (endpoint: string) => void, 
/** Sets a single GraphQL header */
setFetchGraphQlHeader: (key: string, value: string | null) => void, 
/** Removes a GraphQL header */
removeFetchGraphQlHeader: (key: string) => void, 
/** Sets multiple GraphQL headers at once */
setFetchGraphQlHeaders: (header: import('@adobe-commerce/fetch-graphql').Header | ((prev: import('@adobe-commerce/fetch-graphql').Header) => import('@adobe-commerce/fetch-graphql').Header)) => void, 
/** Executes a GraphQL query or mutation */
fetchGraphQl: <T = any>(query: string, options?: import('@adobe-commerce/fetch-graphql').FetchOptions | undefined) => Promise<{
    errors?: import('@adobe-commerce/fetch-graphql').FetchQueryError | undefined;
    data: T;
}>, 
/** Gets the current configuration */
getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: import('@adobe-commerce/fetch-graphql').Header;
};
//# sourceMappingURL=fetch-graphql.d.ts.map