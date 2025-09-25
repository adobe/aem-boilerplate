import { CustomerModel } from '../models';

type PermissionsSchema = {
    text: string;
    children: PermissionsSchema[];
};
/**
 * Flatten the permissions into a list of strings
 * @param permissions - The permissions to flatten
 * @returns A list of strings representing the flattened permissions
 */
export declare const flattenPermissions: (permissions: PermissionsSchema[]) => string[];
export declare function transformCustomer(customerData: any): CustomerModel;
export {};
//# sourceMappingURL=transform-customer.d.ts.map