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
 * Default customer group ID for non-logged-in (NLI) customers.
 * This value is emitted via the 'auth/group-uid' event when:
 * - A customer is not authenticated
 * - Token validation fails
 * - Customer logs out
 */
export declare const DEFAULT_NLI_CUSTOMER_GROUP_ID = "b6589fc6ab0dc82cf12099d1c2d40ab994e8410c";
/**
 * Emits the auth/group-uid event with the provided group UID.
 * If a value is provided, it will be converted from base64 to SHA1 hash.
 * If no value is provided, the default NLI customer group ID will be emitted.
 *
 * @param groupUid - The base64 encoded group UID, or undefined/null for default
 */
export declare const emitAuthGroupIdEvent: (groupUid?: string | null) => Promise<void>;
//# sourceMappingURL=emitAuthGroupId.d.ts.map