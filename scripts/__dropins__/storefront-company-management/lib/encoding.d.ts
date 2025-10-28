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
/**
 * Encodes a string to base64
 * @param value - The string to encode
 * @returns The base64 encoded string
 * @throws Error if encoding fails
 */
export declare const encodeBase64: (value: string) => string;
/**
 * Decodes a base64 encoded string
 * @param encoded - The base64 encoded string to decode
 * @returns The decoded string, or the original string if decoding fails
 */
export declare const decodeBase64: (encoded: string) => string;
/**
 * Safely encodes a user ID to base64 for API transmission
 * @param userId - The user ID to encode
 * @returns The base64 encoded user ID
 * @throws Error if userId is empty or encoding fails
 */
export declare const encodeUserId: (userId: string) => string;
/**
 * Safely decodes a base64 encoded user ID from API response
 * @param encodedUserId - The base64 encoded user ID
 * @returns The decoded user ID, or the original string if decoding fails
 */
export declare const decodeUserId: (encodedUserId: string) => string;
//# sourceMappingURL=encoding.d.ts.map