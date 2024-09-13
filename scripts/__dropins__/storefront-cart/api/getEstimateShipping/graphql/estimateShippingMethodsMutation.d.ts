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
export declare const ESTIMATE_SHIPPING_METHODS_MUTATION = "\n  mutation ESTIMATE_SHIPPING_METHODS_MUTATION(\n    $cartId: String!\n    $address: EstimateAddressInput!\n  ) {\n    estimateShippingMethods(\n      input: {\n        cart_id: $cartId\n        address: $address\n      }\n    ) {\n      amount {\n        currency\n        value\n      }\n      carrier_code\n      method_code\n      error_message\n      price_excl_tax {\n        currency\n        value\n      }\n      price_incl_tax {\n        currency\n        value\n      }\n    }\n  }\n";
//# sourceMappingURL=estimateShippingMethodsMutation.d.ts.map