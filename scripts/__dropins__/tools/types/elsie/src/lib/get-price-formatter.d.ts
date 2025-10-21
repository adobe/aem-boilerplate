/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface PriceFormatterOptions {
    currency?: string | null;
    locale?: string;
    formatOptions?: Intl.NumberFormatOptions;
}
/**
 * Determines the effective locale to use for price formatting
 * Priority: prop locale > global locale > browser locale > default 'en-US'
 */
export declare function getEffectiveLocale(locale?: string): string;
/**
 * Gets an Intl.NumberFormat instance for price formatting
 * Uses getEffectiveLocale internally to determine the best locale
 *
 * @example
 * // Single price formatting
 * const formatter = getPriceFormatter({ currency: 'USD', locale: 'en-US' });
 * const price = formatter.format(10.99); // "$10.99"
 *
 * @example
 * // Bulk price formatting (more efficient)
 * const formatter = getPriceFormatter({ currency: 'EUR', locale: 'fr-FR' });
 * const prices = [10.99, 25.50, 99.99].map(amount => formatter.format(amount));
 */
export declare function getPriceFormatter(options?: PriceFormatterOptions): Intl.NumberFormat;
//# sourceMappingURL=get-price-formatter.d.ts.map