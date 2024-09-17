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
export declare const CHECKOUT_DATA_FRAGMENT = "\n  fragment CheckoutData on Cart {\n    is_virtual\n    email\n    total_quantity\n    billing_address {\n      city\n      country {\n        code\n        label\n      }\n      firstname\n      lastname\n      company\n      postcode\n      vat_id\n      region {\n        region_id\n        code\n        label\n      }\n      street\n      telephone\n      custom_attributes {\n        ... on AttributeValue {\n          code\n          value\n        }\n      }\n    }\n    shipping_addresses {\n      firstname\n      lastname\n      company\n      street\n      city\n      postcode\n      vat_id\n      region {\n        region_id\n        code\n        label\n      }\n      country {\n        code\n        label\n      }\n      telephone\n      custom_attributes {\n        ... on AttributeValue {\n          code\n          value\n        }\n      }\n      available_shipping_methods {\n        amount {\n          currency\n          value\n        }\n        available\n        carrier_code\n        carrier_title\n        error_message\n        method_code\n        method_title\n        price_excl_tax {\n          value\n          currency\n        }\n        price_incl_tax {\n          value\n          currency\n        }\n      }\n      selected_shipping_method {\n        amount {\n          value\n          currency\n        }\n        carrier_code\n        carrier_title\n        method_code\n        method_title\n        price_excl_tax {\n          value\n          currency\n        }\n        price_incl_tax {\n          value\n          currency\n        }\n      }\n    }\n    available_payment_methods {\n      code\n      title\n    }\n    selected_payment_method {\n      code\n      title\n    }\n  }\n";
export declare const getCartQuery: string;
export declare const getCustomerCartQuery: string;
//# sourceMappingURL=getCart.graphql.d.ts.map