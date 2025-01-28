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
export declare const ORDER_SUMMARY_FRAGMENT = "\n  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {\n    grand_total {\n      value\n      currency\n    }\n    total_giftcard {\n      currency\n      value\n    }\n    subtotal_excl_tax {\n      currency\n      value\n    }\n    subtotal_incl_tax {\n      currency\n      value\n    }\n    taxes {\n      amount {\n        currency\n        value\n      }\n      rate\n      title\n    }\n    total_tax {\n      currency\n      value\n    }\n    total_shipping {\n      currency\n      value\n    }\n    discounts {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n  }\n";
//# sourceMappingURL=OrderSummaryFragment.graphql.d.ts.map