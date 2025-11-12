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
export declare const GET_PURCHASE_ORDER_APPROVAL_RULE = "\n  query GET_PURCHASE_ORDER_APPROVAL_RULE($uid: ID!) {\n    customer {\n      purchase_order_approval_rule(uid: $uid) {\n        created_at\n        created_by\n        description\n        name\n        status\n        uid\n        updated_at\n        applies_to_roles {\n          id\n          name\n          users_count\n        }\n        approver_roles {\n          id\n          name\n          users_count\n        }\n        condition {\n          attribute\n          operator\n          ... on PurchaseOrderApprovalRuleConditionAmount {\n            attribute\n            operator\n            amount {\n              currency\n              value\n            }\n          }\n          ... on PurchaseOrderApprovalRuleConditionQuantity {\n            attribute\n            operator\n            quantity\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getPurchaseOrderApprovalRule.graphql.d.ts.map