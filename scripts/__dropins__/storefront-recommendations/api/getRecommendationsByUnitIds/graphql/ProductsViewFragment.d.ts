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
export declare const PRODUCTS_VIEW_FRAGMENT = "\n  fragment PRODUCTS_VIEW_FRAGMENT on ProductView {\n    __typename\n    name\n    sku\n    queryType\n    visibility\n    images {\n      url\n    }\n    urlKey\n    ... on SimpleProductView {\n      price {\n        final {\n          amount {\n            currency\n            value\n          }\n        }\n      }\n    }\n    ... on ComplexProductView {\n      priceRange {\n        maximum {\n          final {\n            amount {\n              currency\n              value\n            }\n          }\n        }\n        minimum {\n          final {\n            amount {\n              currency\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=ProductsViewFragment.d.ts.map