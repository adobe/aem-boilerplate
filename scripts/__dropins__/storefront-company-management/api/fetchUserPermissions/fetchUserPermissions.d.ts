import { FetchUserPermissionsResult } from '../../types/api/fetchUserPermissions.types';

/**
 * Fetches user permissions and returns both the allowed permission IDs and the role response
 * This is a general-purpose API function that can be used across the application
 *
 * @returns Promise resolving to object containing allowed permission IDs and role response
 * @throws {Error} When network errors or GraphQL errors occur
 */
export declare function fetchUserPermissions(): Promise<FetchUserPermissionsResult>;
//# sourceMappingURL=fetchUserPermissions.d.ts.map