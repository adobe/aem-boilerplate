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
export declare const CONFIRM_EMAIL = "\n  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {\n    confirmEmail(\n      input: { email: $email, confirmation_key: $confirmation_key }\n    ) {\n      customer {\n        email\n      }\n    }\n  }\n";
//# sourceMappingURL=confirmEmail.graphql.d.ts.map