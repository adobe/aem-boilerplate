/**
 * Handles network errors by emitting error events and re-throwing the error
 * A function which can be attached to fetchGraphQL to handle thrown errors in
 * a generic way.
 *
 * @param error - The error that occurred during network operations
 * @throws {Error} Re-throws the original error after emitting event
 */
export declare const handleNetworkError: (error: Error) => never;
//# sourceMappingURL=network-error.d.ts.map