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
/**
 * Permission flags interface for company operations
 */
export interface CompanyPermissionFlags {
    canViewAccount: boolean;
    canEditAccount: boolean;
    canViewAddress: boolean;
    canEditAddress: boolean;
    canViewContacts: boolean;
    canViewPaymentInformation: boolean;
    canViewShippingInformation: boolean;
}
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
 * Builds permission flags from role data
 */
export declare const buildPermissionFlags: (role: any) => CompanyPermissionFlags;
//# sourceMappingURL=company-permissions.d.ts.map