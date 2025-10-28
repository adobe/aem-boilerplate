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
export interface CustomerRolePermission {
    id: string;
    text: string;
    children?: CustomerRolePermission[];
}
export interface CustomerRole {
    id: string;
    name: string;
    permissions: CustomerRolePermission[];
}
export interface Customer {
    role: CustomerRole;
    status: string;
}
export interface FetchUserPermissionsResponse {
    data: {
        customer: Customer;
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface FetchUserPermissionsResult {
    allowedIds: Set<string>;
    roleResponse: FetchUserPermissionsResponse;
}
//# sourceMappingURL=fetchUserPermissions.types.d.ts.map