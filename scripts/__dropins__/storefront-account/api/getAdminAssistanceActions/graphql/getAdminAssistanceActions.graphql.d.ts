/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export declare const GET_ADMIN_ASSISTANCE_ACTIONS = "\n  query GET_ADMIN_ASSISTANCE_ACTIONS($currentPage: Int, $pageSize: Int) {\n    customer {\n      admin_assistance_actions(\n        pageSize: $pageSize\n        currentPage: $currentPage\n      ) {\n        total_count\n        items {\n          action\n          date\n          details\n        }\n        page_info {\n          current_page\n          page_size\n          total_pages\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getAdminAssistanceActions.graphql.d.ts.map