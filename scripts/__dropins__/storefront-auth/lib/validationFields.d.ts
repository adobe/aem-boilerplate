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