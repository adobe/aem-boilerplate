/********************************************************************
 * ADOBE CONFIDENTIAL
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
 * Formats a date string according to a specified locale and options.
 * Returns "Invalid Date" if the input date string is invalid.
 *
 * @param {string} date - The date string to be formatted.
 * @param {string} [locale='en-US'] - The locale to use for formatting. Defaults to 'en-US'.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Optional formatting options to customize the output.
 * @returns {string} The formatted date string, or "Invalid Date" if the input is invalid.
 *
 * @example
 * // Default formatting (en-US locale, MM/DD/YYYY)
 * console.log(formatDateToLocale('2023-08-29'));
 * // Output: "08/29/2023"
 *
 * @example
 * // Formatting with a specified locale (e.g., en-GB for DD/MM/YYYY)
 * console.log(formatDateToLocale('2023-08-29', 'en-GB'));
 * // Output: "29/08/2023"
 *
 * @example
 * // Formatting with a specified locale and custom options (e.g., de-DE with long month format)
 * console.log(formatDateToLocale('2023-08-29', 'de-DE', { month: 'long', year: 'numeric' }));
 * // Output: "29. August 2023"
 *
 * @example
 * // Handling an invalid date string
 * console.log(formatDateToLocale('invalid-date'));
 * // Output: "Invalid Date"
 */
export declare const formatDateToLocale: (date: string, locale?: string, options?: Intl.DateTimeFormatOptions) => string;
//# sourceMappingURL=formatDateToLocale.d.ts.map