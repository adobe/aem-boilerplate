import { CompanyPermissionFlags } from '../types/companyPermission.types';

/**
 * Flattens a nested permissions tree into a Set of permission IDs
 * This is a pure utility function that can be used across the application
 */
export declare const flattenIds: (nodes?: any[]) => Set<string>;
/**
 * Determines if a role is a Company Administrator
 */
export declare const isCompanyAdministrator: (role: any) => boolean;
/**
 * Returns the list of permissions that Company Administrators have by default
 */
export declare const getAdminPermissions: () => string[];
/**
 * Builds permission flags from role data
 */
export declare const buildPermissionFlags: (role: any) => CompanyPermissionFlags;
//# sourceMappingURL=company-permissions.d.ts.map