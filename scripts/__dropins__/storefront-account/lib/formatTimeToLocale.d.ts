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
/**
 * Formats a time string according to a specified locale and options.
 * Returns "Invalid Time" if the input date string is invalid.
 *
 * @param {string} date - The date string to be formatted.
 * @param {string} [locale='en-US'] - The locale to use for formatting. Defaults to 'en-US'.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Optional formatting options to customize the output.
 * @returns {string} The formatted time string, or "Invalid Time" if the input is invalid.
 *
 * @example
 * // Default formatting (en-US locale)
 * console.log(formatTimeToLocale('2023-08-29 12:34'));
 * // Output: "12:34 AM"
 */
export declare const formatTimeToLocale: (date: string, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
//# sourceMappingURL=formatTimeToLocale.d.ts.map