import { CompanyPermissionFlags } from '../types/companyPermission.types';

/**
 * Hook for managing user permissions
 *
 * This hook fetches permissions fresh on each use to ensure they're current.
 * Permissions can change during a session (role updates, admin changes, etc.),
 * so we don't cache them indefinitely.
 *
 * Usage:
 * ```tsx
 * const { permissions, loading, error } = usePermissions();
 *
 * if (loading) return <Spinner />;
 * if (error) return <ErrorDisplay error={error} />;
 *
 * return (
 *   <div>
 *     {permissions?.canEditUsers && <EditButton />}
 *     {permissions?.canViewUsers && <ViewButton />}
 *   </div>
 * );
 * ```
 */
export declare const usePermissions: () => {
    permissions: CompanyPermissionFlags | null;
    loading: boolean;
    error: Error | null;
    refreshPermissions: () => Promise<void>;
};
//# sourceMappingURL=usePermissions.d.ts.map