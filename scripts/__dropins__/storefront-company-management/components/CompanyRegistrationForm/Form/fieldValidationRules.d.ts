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
type ErrorsList = Record<string, string>;
export type ValidationFieldsConfig = {
    validateRules?: Record<string, string | number | boolean>[];
    code?: string;
    customUpperCode: string;
    required: boolean;
};
export type TranslationList = {
    requiredFieldError: string;
    lengthTextError: string;
    numericError: string;
    alphaNumWithSpacesError: string;
    alphaNumericError: string;
    alphaError: string;
    emailError: string;
    phoneError: string;
    postalCodeError: string;
    urlError: string;
    nameError: string;
};
export declare enum InputValidation {
    Numeric = "numeric",
    AlphanumWithSpaces = "alphanum-with-spaces",
    Alphanumeric = "alphanumeric",
    Alpha = "alpha",
    Email = "email",
    Phone = "phone",
    PostalCode = "postal-code",
    Length = "length",
    Url = "url",
    Name = "name"
}
export declare const validateNumeric: (value: string) => boolean;
export declare const validateAlphanumeric: (value: string) => boolean;
export declare const validateAlphanumWithSpaces: (value: string) => boolean;
export declare const validateAlpha: (value: string) => boolean;
export declare const validateEmail: (value: string) => boolean;
export declare const validatePhone: (value: string) => boolean;
export declare const validateUrl: (value: string) => boolean;
export declare const validatePostalCode: (value: string) => boolean;
export declare const validateName: (value: string) => boolean;
export declare const validateLength: (value: string, minLength: number, maxLength: number) => boolean;
export declare const validationFields: (value: string, configs: ValidationFieldsConfig, translations: TranslationList, errorsList: ErrorsList) => {
    [x: string]: string;
};
export {};
//# sourceMappingURL=fieldValidationRules.d.ts.map