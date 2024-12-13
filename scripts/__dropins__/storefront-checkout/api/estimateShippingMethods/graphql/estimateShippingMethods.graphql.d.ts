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
export declare const estimateShippingMethodsMutation = "\n  mutation estimateShippingMethods(\n    $cartId: String!\n    $address: EstimateAddressInput!\n  ) {\n    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {\n      carrier_title\n      carrier_code\n      method_title\n      method_code\n      available\n      amount {\n        currency\n        value\n      }\n      price_excl_tax {\n        currency\n        value\n      }\n      price_incl_tax {\n        currency\n        value\n      }\n      error_message\n    }\n  }\n";
//# sourceMappingURL=estimateShippingMethods.graphql.d.ts.map