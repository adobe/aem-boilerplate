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
export declare const GET_CUSTOMER_ADDRESS = "\n  query GET_CUSTOMER_ADDRESS {\n    customer {\n      addresses {\n        firstname\n        lastname\n        middlename\n        fax\n        prefix\n        suffix\n        city\n        company\n        country_code\n        region {\n          region\n          region_code\n          region_id\n        }\n        custom_attributesV2 {\n          ... on AttributeValue {\n            code\n            value\n          }\n        }\n        telephone\n        id\n        vat_id\n        postcode\n        street\n        default_shipping\n        default_billing\n      }\n    }\n  }\n";
//# sourceMappingURL=getCustomerAddress.graphql.d.ts.map