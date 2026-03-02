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
export declare const GET_CUSTOMER = "\n  query GET_CUSTOMER {\n    customer {\n      ...BASIC_CUSTOMER_INFO_FRAGMENT\n      custom_attributes {\n        ... on AttributeValue {\n          code\n          value\n        }\n        code\n      }\n    }\n  }\n  \n  fragment BASIC_CUSTOMER_INFO_FRAGMENT on Customer {\n    date_of_birth\n    email\n    firstname\n    gender\n    lastname\n    middlename\n    prefix\n    suffix\n    created_at\n  }\n\n";
//# sourceMappingURL=getCustomer.graphql.d.ts.map