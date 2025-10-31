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
export declare const GET_COMPANY_CREDIT_HISTORY = "\n  query GET_COMPANY_CREDIT_HISTORY($filter: CompanyCreditHistoryFilterInput, $pageSize: Int, $currentPage: Int) {\n    company {\n      credit_history(\n        filter: $filter\n        pageSize: $pageSize\n        currentPage: $currentPage\n      ) {\n        items {\n          amount {\n            currency\n            value\n          }\n          balance {\n            available_credit {\n              currency\n              value\n            }\n            credit_limit {\n              currency\n              value\n            }\n            outstanding_balance {\n              currency\n              value\n            }\n          }\n          custom_reference_number\n          date\n          type\n          updated_by {\n            name\n            type\n          }\n        }\n        page_info {\n          current_page\n          page_size\n          total_pages\n        }\n        total_count\n      }\n    }\n  }\n";
//# sourceMappingURL=getCompanyCreditHistory.graphql.d.ts.map