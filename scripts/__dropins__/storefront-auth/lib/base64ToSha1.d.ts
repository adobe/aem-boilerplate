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
/**
 * Converts a base64 encoded string to a SHA1 hash string
 * @param base64String - The base64 encoded string to convert
 * @returns A promise that resolves to the SHA1 hash as a hexadecimal string, or empty string if input is undefined/null/empty or if conversion fails
 */
export declare const base64ToSha1: (base64String?: string | null) => Promise<string>;
//# sourceMappingURL=base64ToSha1.d.ts.map