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
export declare const ADD_PURCHASE_ORDER_ITEMS_TO_CART = "\n  mutation ADD_PURCHASE_ORDER_ITEMS_TO_CART(\n    $purchaseOrderUid: ID!\n    $cartId: String!\n    $replaceExistingCartItems: Boolean!\n  ) {\n    addPurchaseOrderItemsToCart(\n      input: {\n        purchase_order_uid: $purchaseOrderUid\n        cart_id: $cartId\n        replace_existing_cart_items: $replaceExistingCartItems\n      }\n    ) {\n      cart {\n        id\n        itemsV2 {\n          items {\n            uid\n            quantity\n            product {\n              uid\n              name\n              sku\n            }\n          }\n          page_info {\n            current_page\n            page_size\n            total_pages\n          }\n          total_count\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=addPurchaseOrderItemsToCart.graphql.d.ts.map