/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 *  the property of Adobe and its suppliers, if any. The intellectual
 *  and technical concepts contained herein are proprietary to Adobe
 *  and its suppliers and are protected by all applicable intellectual
 *  property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
/** Use as third argument to format as date + time (e.g. "July 28, 2025, 2:26:04 PM"). */
export declare const FORMAT_DATETIME: "datetime";
export type FormatDateToLocaleOptions = Intl.DateTimeFormatOptions | typeof FORMAT_DATETIME;
/**
 * Formats a date or date-time string according to locale and options.
 * Returns "Invalid Date" if the input is invalid.
 *
 * @param date - The date string (e.g. ISO 8601 or YYYY-MM-DD).
 * @param locale - The locale for formatting. Defaults to 'en-US'.
 * @param options - Format options: an object (date-only by default, merged with defaults), or FORMAT_DATETIME for long date+time (e.g. "July 28, 2025, 2:26:04 PM").
 * @returns The formatted string, or "Invalid Date" if invalid.
 *
 * @example
 * // Date only (MM/DD/YYYY)
 * formatDateToLocale('2023-08-29');
 * // => "08/29/2023"
 *
 * @example
 * // Date and time (long format, cached per locale)
 * formatDateToLocale('2024-10-10T12:00:00.000Z', 'en-US', FORMAT_DATETIME);
 * // => "October 10, 2024, 12:00:00 PM"
 *
 * @example
 * // Custom options
 * formatDateToLocale('2023-08-29', 'de-DE', { month: 'long', year: 'numeric' });
 * // => "29. August 2023"
 */
export declare const formatDateToLocale: (date: string, locale?: string, options?: FormatDateToLocaleOptions) => string;
//# sourceMappingURL=formatDateToLocale.d.ts.map