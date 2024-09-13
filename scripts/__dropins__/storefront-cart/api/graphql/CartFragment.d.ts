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
export declare const CART_FRAGMENT: string;
export declare const CART_ITEMS_PAGINATION_ARGUMENTS = "\n  $pageSize: Int! = 100,\n  $currentPage: Int! = 1,\n  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}\n";
export declare const CUSTOMER_ACCOUNT_FRAGMENT = "\ncustomer {\n  addresses {\n    default_shipping\n    country_id\n    postcode\n    region {\n      region\n      region_code\n      region_id\n    }\n  }\n}";
//# sourceMappingURL=CartFragment.d.ts.map