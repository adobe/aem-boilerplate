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
export declare const PRODUCT_FRAGMENT = "\nfragment PRODUCT_FRAGMENT on ProductView {\n  __typename\n  id\n  sku\n  name\n  shortDescription\n  metaDescription\n  metaKeyword\n  metaTitle\n  description\n  inStock\n  addToCartAllowed\n  url\n  urlKey\n  externalId\n  images(roles: []) {\n    url\n    label\n    roles\n  }\n  attributes(roles: []) {\n    name\n    label\n    value\n    roles\n  }\n  ... on SimpleProductView {\n    price {\n      roles\n      regular {\n        amount {\n          value\n          currency\n        }\n      }\n      final {\n        amount {\n          value\n          currency\n        }\n      }\n    }\n  }\n  ... on ComplexProductView {\n    options {\n      ...PRODUCT_OPTION_FRAGMENT\n    }\n    ...PRICE_RANGE_FRAGMENT\n  }\n}\nfragment PRODUCT_OPTION_FRAGMENT on ProductViewOption {\n  id\n  title\n  required\n  multi\n  values {\n    id\n    title\n    inStock\n    __typename\n    ... on ProductViewOptionValueProduct {\n      title\n      quantity\n      isDefault\n      __typename\n      product {\n        sku\n        shortDescription\n        metaDescription\n        metaKeyword\n        metaTitle\n        name\n        price {\n          final {\n            amount {\n              value\n              currency\n            }\n          }\n          regular {\n            amount {\n              value\n              currency\n            }\n          }\n          roles\n        }\n      }\n    }\n    ... on ProductViewOptionValueSwatch {\n      id\n      title\n      type\n      value\n      inStock\n    }\n  }\n}\nfragment PRICE_RANGE_FRAGMENT on ComplexProductView {\n  priceRange {\n    maximum {\n      final {\n        amount {\n          value\n          currency\n        }\n      }\n      regular {\n        amount {\n          value\n          currency\n        }\n      }\n      roles\n    }\n    minimum {\n      final {\n        amount {\n          value\n          currency\n        }\n      }\n      regular {\n        amount {\n          value\n          currency\n        }\n      }\n      roles\n    }\n  }\n}\n";
//# sourceMappingURL=ProductFragment.graphql.d.ts.map