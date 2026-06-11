/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export interface JwtPayload {
    [key: string]: unknown;
    exp?: number;
    iat?: number;
    sub?: string;
    admin_id?: number;
    uid?: number;
    utypid?: number;
}
/**
 * Decodes JWT token payload without verification
 * JWT format: header.payload.signature
 * Only decodes the payload part (base64url encoded)
 *
 * @param token - JWT token string
 * @returns Decoded payload object or null if invalid
 */
export declare const decodeJwtToken: (token: string) => JwtPayload | null;
/**
 * Checks if the JWT token belongs to an admin user
 *
 * @param token - JWT token string
 * @returns true if token indicates admin user, false otherwise
 */
export declare const isAdminToken: (token: string) => boolean;
/**
 * Gets JWT token expiration as Max-Age string for cookie
 *
 * @param token - JWT token string
 * @param defaultMaxAge - Default Max-Age string to return if token is invalid or missing exp claim (e.g., "Max-Age=3600")
 * @returns Max-Age string for cookie (e.g., "Max-Age=3600") based on token exp or defaultMaxAge
 */
export declare const getTokenExpiration: (token: string, defaultMaxAge: string) => string;
//# sourceMappingURL=jwtUtils.d.ts.map