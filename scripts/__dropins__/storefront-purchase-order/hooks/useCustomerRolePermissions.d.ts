import { CustomerRolePermissionsModel } from '../data/models';

/**
 * Hook to consume customer role permissions from the auth/permissions event
 *
 * Initializes with last payload and subscribes to real-time updates.
 * Transforms permissions data where:
 * - true: Permission granted
 * - false: Permission disabled (overrides admin - PO feature disabled)
 * - Default: Admins get access, regular users don't
 *
 * @returns {permissions: CustomerRolePermissionsModel, loadingPermissions: boolean}
 */
export declare const useCustomerRolePermissions: () => {
    permissions: CustomerRolePermissionsModel;
    loadingPermissions: boolean;
};
//# sourceMappingURL=useCustomerRolePermissions.d.ts.map