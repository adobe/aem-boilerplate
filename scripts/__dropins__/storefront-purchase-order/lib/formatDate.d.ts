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
 * Determines the effective locale to use for price formatting
 * Priority: prop locale > global locale > browser locale > default 'en-US'
 */
export declare function getEffectiveLocale(locale?: string): string;
/**
 * Format a date string to a localized format like "Sep 8, 2025 6:32:13 AM"
 * @param dateString - ISO date string or date string
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted date string
 */
export declare const formatDate: (dateString: string, locale?: string) => string;
//# sourceMappingURL=formatDate.d.ts.map