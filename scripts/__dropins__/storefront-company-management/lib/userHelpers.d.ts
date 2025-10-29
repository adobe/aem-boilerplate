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
 * Formats a user status string for display
 * @param status - The raw status string (e.g., 'ACTIVE', 'INACTIVE')
 * @param translations - Translation object containing statusActive and statusInactive keys
 * @returns The formatted status string for display
 */
export declare const formatUserStatus: (status: string, translations: {
    statusActive?: string;
    statusInactive?: string;
}) => string;
/**
 * Formats a user's full name by combining first and last name
 * @param firstName - The user's first name
 * @param lastName - The user's last name
 * @returns The formatted full name, trimmed of extra spaces
 */
export declare const formatUserName: (firstName: string, lastName: string) => string;
/**
 * Checks if a user has a specific status
 * @param userStatus - The user's current status
 * @param expectedStatus - The status to check against
 * @returns true if the user has the expected status
 */
export declare const hasUserStatus: (userStatus: string, expectedStatus: string) => boolean;
/**
 * Gets the opposite status for toggling (ACTIVE <-> INACTIVE)
 * @param currentStatus - The current user status
 * @returns The opposite status, or the current status if not recognized
 */
export declare const getToggleStatus: (currentStatus: string) => string;
//# sourceMappingURL=userHelpers.d.ts.map