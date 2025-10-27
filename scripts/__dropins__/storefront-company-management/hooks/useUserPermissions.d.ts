import { CompanyPermissionFlags } from '../lib/company-permissions';

/**
 * Hook to fetch user permissions without requiring full company profile access
 */
export declare const useUserPermissions: () => {
    permissions: CompanyPermissionFlags | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};
//# sourceMappingURL=useUserPermissions.d.ts.map