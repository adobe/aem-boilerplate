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
export interface CompanyRolePermissionsTree {
    id: string;
    sortOrder: number;
    text: string;
    children?: CompanyRolePermissionsTree[];
}
export interface CompanyRole {
    id: string;
    name: string;
    usersCount: number;
    permissions: CompanyRolePermissionsTree[];
}
export interface PurchaseOrderApprovalRuleMetadataModel {
    availableAppliesTo: CompanyRole[];
    availableRequiresApprovalFrom: CompanyRole[];
}
//# sourceMappingURL=purchase-order-approval-rule-metadata-model.d.ts.map