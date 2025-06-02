/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
export declare const REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION = "\n  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(\n      $wishlistId: ID!, \n      $wishlistItemsIds: [ID!]!,\n    ) {\n    removeProductsFromWishlist(\n      wishlistId: $wishlistId\n      wishlistItemsIds: $wishlistItemsIds\n    ) {\n      user_errors {\n        code\n        message\n      }\n    }\n  }\n";
//# sourceMappingURL=removeProductsFromWishlistMutation.d.ts.map