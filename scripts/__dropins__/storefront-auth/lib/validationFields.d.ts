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
type TranslationList = Record<string, string>;
type ErrorsList = Record<string, string>;
export type ValidationFieldsConfig = {
    validateRules: Record<string, string>[];
    code?: string;
    customUpperCode: string;
    required: boolean;
};
export declare enum InputValidation {
    Numeric = "numeric",
    AlphanumWithSpaces = "alphanum-with-spaces",
    Alphanumeric = "alphanumeric",
    Alpha = "alpha",
    Email = "email",
    Length = "length",
    Date = "date",
    Url = "url"
}
export declare const validateNumeric: (value: string) => boolean;
export declare const validateAlphanumWithSpaces: (value: string) => boolean;
export declare const validateAlphanumeric: (value: string) => boolean;
export declare const validateAlpha: (value: string) => boolean;
export declare const validateEmail: (value: string) => boolean;
export declare const validateDate: (value: string) => boolean;
export declare const isDateWithinRange: (date: string, minTimestamp?: number, maxTimestamp?: number) => boolean;
export declare const convertTimestampToDate: (timestamp: string | undefined | null) => string;
export declare const validateUrl: (url: string) => boolean;
export declare const validateLength: (value: string, minLength: number, maxLength: number) => boolean;
export declare const validationFields: (value: string, configs: ValidationFieldsConfig, translations: TranslationList, errorsList: ErrorsList) => {
    [x: string]: string;
};
export {};
//# sourceMappingURL=validationFields.d.ts.map