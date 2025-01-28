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
export declare const RESET_PASSWORD = "\n  mutation RESET_PASSWORD(\n    $email: String!\n    $resetPasswordToken: String!\n    $newPassword: String!\n  ) {\n    resetPassword(\n      email: $email\n      resetPasswordToken: $resetPasswordToken\n      newPassword: $newPassword\n    )\n  }\n";
//# sourceMappingURL=resetPassword.graphql.d.ts.map