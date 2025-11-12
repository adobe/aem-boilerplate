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
export declare const PLACE_ORDER_FOR_PURCHASE_ORDER = "\n  mutation PLACE_ORDER_FOR_PURCHASE_ORDER(\n    $input: PlaceOrderForPurchaseOrderInput!\n  ) {\n    placeOrderForPurchaseOrder(input: $input) {\n      order {\n        available_actions\n        carrier\n        email\n        gift_receipt_included\n        id\n        is_virtual\n        number\n        order_date\n        order_status_change_date\n        printed_card_included\n        shipping_method\n        status\n        token\n      }\n    }\n  }\n";
//# sourceMappingURL=placeOrderForPurchaseOrder.graphql.d.ts.map