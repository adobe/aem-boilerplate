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
export interface CompanyUsersQuery {
    company: {
        users: {
            items: Array<{
                id: string;
                firstname: string;
                lastname: string;
                email: string;
                role: {
                    name: string;
                };
                status: string;
                team: {
                    name: string;
                } | null;
            }>;
            page_info: {
                page_size: number;
                current_page: number;
                total_pages: number;
            };
            total_count: number;
        };
    };
}
export interface CompanyUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    team?: string;
}
export type CompanyUserStatus = 'ACTIVE' | 'INACTIVE';
export interface CompanyUsersFilter {
    status?: CompanyUserStatus;
}
export interface CompanyUsersParams {
    pageSize?: number;
    currentPage?: number;
    filter?: CompanyUsersFilter;
}
export interface CompanyUsersPageInfo {
    pageSize: number;
    currentPage: number;
    totalPages: number;
}
export interface CompanyUsersResponse {
    users: CompanyUser[];
    pageInfo: CompanyUsersPageInfo;
    totalCount?: number;
}
//# sourceMappingURL=companyUsers.types.d.ts.map