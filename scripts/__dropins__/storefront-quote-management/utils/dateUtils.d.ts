/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
/**
 * Gets the user's timezone with fallback to UTC if detection fails
 * @returns The user's timezone string (e.g., 'America/New_York') or 'UTC' as fallback
 */
export declare function formatExpirationDate(date: string, dateFormatter: Intl.DateTimeFormat): string;
export declare function getUserTimezone(): string;
/**
 * Formats a date string to locale date string, returning "–" for invalid dates
 * @param dateString - The date string to format
 * @returns Formatted date string or "–" for invalid dates
 */
export declare function formattedDate(dateString: string): string;
//# sourceMappingURL=dateUtils.d.ts.map