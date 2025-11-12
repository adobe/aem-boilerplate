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
export declare const GET_PURCHASE_ORDER_APPROVAL_RULES = "\n  query GET_PURCHASE_ORDER_APPROVAL_RULES($currentPage: Int!, $pageSize: Int!) {\n    customer {\n      email\n      purchase_order_approval_rules(\n        currentPage: $currentPage\n        pageSize: $pageSize\n      ) {\n        items {\n          applies_to_roles {\n            id\n            name\n            users_count\n            permissions {\n              id\n              sort_order\n              text\n              children {\n                id\n                sort_order\n                text\n              }\n            }\n          }\n          approver_roles {\n            id\n            name\n            users_count\n            permissions {\n              id\n              sort_order\n              text\n              children {\n                id\n                sort_order\n                text\n              }\n            }\n          }\n          condition {\n            attribute\n            operator\n          }\n          created_at\n          created_by\n          description\n          name\n          status\n          uid\n          updated_at\n        }\n        total_count\n        page_info {\n          page_size\n          current_page\n          total_pages\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getPurchaseOrderApprovalRules.graphql.d.ts.map