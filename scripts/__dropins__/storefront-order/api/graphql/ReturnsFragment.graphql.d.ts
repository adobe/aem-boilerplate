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
export declare const RETURNS_FRAGMENT = "\n  fragment RETURNS_FRAGMENT on Returns {\n    __typename\n    items {\n      number\n      status\n      created_at\n      shipping {\n        tracking {\n          status {\n            text\n            type\n          }\n          carrier {\n            uid\n            label\n          }\n          tracking_number\n        }\n      }\n      order {\n        number\n        token\n      }\n      items {\n        uid\n        quantity\n        status\n        request_quantity\n        order_item {\n          ...ORDER_ITEM_DETAILS_FRAGMENT\n          ... on GiftCardOrderItem {\n            ...GIFT_CARD_DETAILS_FRAGMENT\n            product {\n              ...PRODUCT_DETAILS_FRAGMENT\n            }\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=ReturnsFragment.graphql.d.ts.map