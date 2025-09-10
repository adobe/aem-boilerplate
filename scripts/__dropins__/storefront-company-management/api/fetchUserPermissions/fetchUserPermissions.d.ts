/**
 * Fetches user permissions and returns both the allowed permission IDs and the role response
 * This is a general-purpose API function that can be used across the application
 */
export declare const fetchUserPermissions: () => Promise<{
    allowedIds: Set<string>;
    roleResponse: any;
}>;
//# sourceMappingURL=fetchUserPermissions.d.ts.map