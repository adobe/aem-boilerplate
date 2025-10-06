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
export declare const BILLING_CART_ADDRESS_FRAGMENT = "\n  fragment BILLING_CART_ADDRESS_FRAGMENT on BillingCartAddress {\n    city\n    company\n    country {\n      code\n      label\n    }\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    fax\n    firstname\n    id\n    lastname\n    middlename\n    postcode\n    prefix\n    region {\n      region_id\n      code\n      label\n    }\n    street\n    suffix\n    telephone\n    uid\n    vat_id\n  }\n";
export declare const SHIPPING_CART_ADDRESS_FRAGMENT: string;
//# sourceMappingURL=CartAddressFragment.graphql.d.ts.map