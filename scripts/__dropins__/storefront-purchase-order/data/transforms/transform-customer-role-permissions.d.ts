import { CustomerRolePermissionsModel } from '../models/customer-role-permissions-model';

type PermissionsPayload = {
    admin?: boolean;
    [key: string]: boolean | undefined;
};
/**
 * Transforms flat permissions object from auth/permissions event into CustomerRolePermissionsModel
 *
 * Permission Logic:
 * - true: Permission granted
 * - false: Permission disabled (overrides admin privileges - indicates PO feature is disabled)
 * - Default: Admins get access, regular users don't
 *
 * @param permissionsData - Flat object with permission keys and admin flag
 * @returns CustomerRolePermissionsModel
 */
export declare const transformPermissions: (permissionsData: PermissionsPayload | null | undefined) => CustomerRolePermissionsModel;
export {};
//# sourceMappingURL=transform-customer-role-permissions.d.ts.map