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
export interface CompanyAclResourceResponse {
    id: string;
    text: string;
    sort_order: number;
    children?: CompanyAclResourceResponse[];
}
export interface CompanyRoleResponse {
    id: string;
    name: string;
    users_count: number;
    permissions: CompanyAclResourceResponse[];
}
export interface PageInfoResponse {
    current_page: number;
    page_size: number;
    total_pages: number;
}
export interface CompanyRolesResponse {
    items: CompanyRoleResponse[];
    total_count: number;
    page_info: PageInfoResponse;
}
export interface GetCompanyRolesResponse {
    data: {
        company: {
            roles: CompanyRolesResponse;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface GetCompanyRoleResponse {
    data: {
        company: {
            role: CompanyRoleResponse;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface GetCompanyAclResourcesResponse {
    data: {
        company: {
            acl_resources: CompanyAclResourceResponse[];
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface CreateCompanyRoleResponse {
    data: {
        createCompanyRole: {
            role: CompanyRoleResponse;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface UpdateCompanyRoleResponse {
    data: {
        updateCompanyRole: {
            role: CompanyRoleResponse;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface DeleteCompanyRoleResponse {
    data: {
        deleteCompanyRole: {
            success: boolean;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface IsCompanyRoleNameAvailableResponse {
    data: {
        isCompanyRoleNameAvailable: {
            is_role_name_available: boolean;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export interface CompanyRoleCreateInput {
    name: string;
    permissions?: string[];
}
export interface CompanyRoleUpdateInput {
    id: string;
    name?: string;
    permissions?: string[];
}
export interface GetCompanyRolesVariables {
    pageSize?: number;
    currentPage?: number;
}
export interface GetCompanyRoleVariables {
    id: string;
}
export interface CreateCompanyRoleVariables {
    input: CompanyRoleCreateInput;
}
export interface UpdateCompanyRoleVariables {
    input: CompanyRoleUpdateInput;
}
export interface DeleteCompanyRoleVariables {
    id: string;
}
export interface IsCompanyRoleNameAvailableVariables {
    name: string;
}
//# sourceMappingURL=companyRoles.types.d.ts.map