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
export declare const COMPANY_USERS_QUERY = "\n  query COMPANY_USERS($pageSize: Int!, $currentPage: Int!, $filter: CompanyUsersFilterInput) {\n    company {\n      users(pageSize: $pageSize, currentPage: $currentPage, filter: $filter) {\n        items {\n          id\n          firstname\n          lastname\n          email\n          role {\n            name\n          }\n          status\n          team {\n            name\n          }\n        }\n        page_info {\n          page_size\n          current_page\n          total_pages\n        }\n        total_count\n      }\n    }\n  }\n";
//# sourceMappingURL=companyUsers.graphql.d.ts.map