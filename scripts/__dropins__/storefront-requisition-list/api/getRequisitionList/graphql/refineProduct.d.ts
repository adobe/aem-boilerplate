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
export declare const REFINE_PRODUCT = "\n  query REFINE_PRODUCT(\n    $optionIds: [String!]!,\n    $sku: String!\n  ) {\n    refineProduct(\n      optionIds: $optionIds\n      sku: $sku\n    ) {\n      sku\n      name\n      images {\n        url\n      }\n      ... on SimpleProductView {\n        price {\n          final {\n            amount {\n              value\n              currency\n            }\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=refineProduct.d.ts.map