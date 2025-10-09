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
export declare const ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION = "\n  mutation ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION(\n      $requisitionListUid: ID!, \n      $requisitionListItemUids: [ID!]!\n    ) {\n    addRequisitionListItemsToCart(\n      requisitionListUid: $requisitionListUid\n      requisitionListItemUids: $requisitionListItemUids\n    ) {\n      status\n      add_requisition_list_items_to_cart_user_errors {\n        message\n        type\n      }\n    }\n  }\n";
//# sourceMappingURL=addRequisitionListItemsToCart.d.ts.map