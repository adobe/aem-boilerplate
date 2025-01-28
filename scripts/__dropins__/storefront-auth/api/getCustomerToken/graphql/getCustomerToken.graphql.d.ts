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
export declare const GET_CUSTOMER_TOKEN = "\n  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {\n    generateCustomerToken(email: $email, password: $password) {\n      token\n    }\n  }\n";
//# sourceMappingURL=getCustomerToken.graphql.d.ts.map