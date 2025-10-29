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
export interface CompanyAclResourceModel {
    id: string;
    text: string;
    sortOrder: number;
    children?: CompanyAclResourceModel[];
}
export interface CompanyRoleModel {
    id: string;
    name: string;
    usersCount: number;
    permissions: CompanyAclResourceModel[];
}
export interface PageInfoModel {
    currentPage: number;
    pageSize: number;
    totalPages: number;
}
export interface CompanyRolesResponseModel {
    items: CompanyRoleModel[];
    totalCount: number;
    pageInfo: PageInfoModel;
}
export interface CompanyRoleCreateInputModel {
    name: string;
    permissions: string[];
}
export interface CompanyRoleUpdateInputModel {
    id: string;
    name?: string;
    permissions?: string[];
}
//# sourceMappingURL=company-role.d.ts.map