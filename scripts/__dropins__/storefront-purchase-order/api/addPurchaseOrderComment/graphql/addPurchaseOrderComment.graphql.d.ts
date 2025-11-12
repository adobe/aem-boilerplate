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
export declare const ADD_PURCHASE_ORDER_COMMENT = "\n  mutation ADD_PURCHASE_ORDER_COMMENT(\n    $purchaseOrderUid: ID!\n    $comment: String!\n  ) {\n    addPurchaseOrderComment(\n      input: { purchase_order_uid: $purchaseOrderUid, comment: $comment }\n    ) {\n      comment {\n        created_at\n        text\n        uid\n        author {\n          allow_remote_shopping_assistance\n          confirmation_status\n          created_at\n          date_of_birth\n          email\n          firstname\n          gender\n          job_title\n          lastname\n          middlename\n          prefix\n          status\n          structure_id\n          suffix\n          telephone\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=addPurchaseOrderComment.graphql.d.ts.map