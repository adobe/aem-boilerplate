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
export declare const GET_PURCHASE_ORDER_APPROVAL_RULE_METADATA = "\n  query GET_PURCHASE_ORDER_APPROVAL_RULE_METADATA {\n    customer {\n      purchase_order_approval_rule_metadata {\n        available_applies_to {\n          id\n          name\n          users_count\n          permissions {\n            id\n            sort_order\n            text\n            children {\n              id\n              sort_order\n              text\n            }\n          }\n        }\n        available_requires_approval_from {\n          id\n          name\n          users_count\n          permissions {\n            id\n            sort_order\n            text\n            children {\n              id\n              sort_order\n              text\n            }\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getPurchaseOrderApprovalRuleMetadata.graphql.d.ts.map