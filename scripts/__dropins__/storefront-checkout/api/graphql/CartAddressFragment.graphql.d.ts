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
export declare const BILLING_CART_ADDRESS_FRAGMENT = "\n  fragment BILLING_CART_ADDRESS_FRAGMENT on BillingCartAddress {\n    id\n    city\n    country {\n      code\n      label\n    }\n    firstname\n    lastname\n    company\n    postcode\n    vat_id\n    region {\n      region_id\n      code\n      label\n    }\n    street\n    telephone\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    prefix\n    suffix\n    middlename\n    fax\n  }\n";
export declare const SHIPPING_CART_ADDRESS_FRAGMENT = "\n  fragment SHIPPING_CART_ADDRESS_FRAGMENT on ShippingCartAddress {\n    id\n    firstname\n    lastname\n    company\n    street\n    city\n    postcode\n    vat_id\n    region {\n      region_id\n      code\n      label\n    }\n    country {\n      code\n      label\n    }\n    telephone\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    available_shipping_methods {\n      amount {\n        currency\n        value\n      }\n      available\n      carrier_code\n      carrier_title\n      error_message\n      method_code\n      method_title\n      price_excl_tax {\n        value\n        currency\n      }\n      price_incl_tax {\n        value\n        currency\n      }\n    }\n    selected_shipping_method {\n      amount {\n        value\n        currency\n      }\n      carrier_code\n      carrier_title\n      method_code\n      method_title\n      price_excl_tax {\n        value\n        currency\n      }\n      price_incl_tax {\n        value\n        currency\n      }\n    }\n    same_as_billing\n    prefix\n    suffix\n    middlename\n    fax\n  }\n";
//# sourceMappingURL=CartAddressFragment.graphql.d.ts.map