/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2024 Adobe
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
export declare const REORDER_ITEMS_MUTATION = "\n  mutation REORDER_ITEMS_MUTATION($orderNumber: String!) {\n    reorderItems(orderNumber: $orderNumber) {\n      cart {\n        itemsV2 {\n          items {\n            uid\n          }\n        }\n      }\n      userInputErrors {\n        code\n        message\n        path\n      }\n    }\n  }\n";
//# sourceMappingURL=reorderItems.graphql.d.ts.map