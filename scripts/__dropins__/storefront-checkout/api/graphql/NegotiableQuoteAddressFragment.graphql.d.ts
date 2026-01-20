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
export declare const NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT = "\n  fragment NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT on NegotiableQuoteBillingAddress {\n    city\n    company\n    country {\n      code\n      label\n    }\n    custom_attributes {\n      ... on AttributeValue {\n        code\n        value\n      }\n    }\n    customer_address_uid\n    fax\n    firstname\n    lastname\n    middlename\n    postcode\n    prefix\n    region {\n      region_id\n      code\n      label\n    }\n    street\n    suffix\n    telephone\n    uid\n    vat_id\n  }\n";
export declare const NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT: string;
//# sourceMappingURL=NegotiableQuoteAddressFragment.graphql.d.ts.map