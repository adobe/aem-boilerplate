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
export { getCompanyRoles } from './getCompanyRoles';
export { getCompanyRole } from './getCompanyRole';
export { getCompanyAclResources } from './getCompanyAclResources';
export { createCompanyRole } from './createCompanyRole';
export { updateCompanyRole } from './updateCompanyRole';
export { deleteCompanyRole } from './deleteCompanyRole';
export { isCompanyRoleNameAvailable } from './isCompanyRoleNameAvailable';
export { flattenPermissionIds, buildPermissionTree } from './utils';
export type { CompanyAclResourceModel, CompanyRoleModel, PageInfoModel, CompanyRolesResponseModel, CompanyRoleCreateInputModel, CompanyRoleUpdateInputModel, } from '../../data/models/company-role';
export type { GetCompanyRolesVariables, GetCompanyRoleVariables, DeleteCompanyRoleVariables, IsCompanyRoleNameAvailableVariables, } from '../../types/api/companyRoles.types';
//# sourceMappingURL=index.d.ts.map