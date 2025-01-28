/**
 * Error types in this enum are used to provide custom i18n translations for specific validation errors.
 * Each key corresponds to an error type that maps to the `Auth.FormText` i18n values in `src/i18n/en_US.json`.
 */
export declare enum ValidationErrorTypes {
    REQUIRED_FIELD_ERROR = "requiredFieldError",
    NUMERIC_ERROR = "numericError",
    ALPHA_NUM_WITH_SPACES_ERROR = "alphaNumWithSpacesError",
    ALPHA_NUMERIC_ERROR = "alphaNumericError",
    ALPHA_ERROR = "alphaError",
    EMAIL_ERROR = "emailError",
    DATE_ERROR = "dateError",
    DATE_RANGE_ERROR = "dateRangeError",
    DATE_MAX_ERROR = "dateMaxError",
    DATE_MIN_ERROR = "dateMinError",
    URL_ERROR = "urlError",
    LENGTH_TEXT_ERROR = "lengthTextError"
}
/**
 * `ERROR_CONFIG_SEPARATOR` uses the ASCII 31 (Unit Separator) character,
 * a rarely used control character, to avoid conflicts with custom i18n error messages.
 *
 * Learn more: https://theasciicode.com.ar/ascii-control-characters/unit-separator-ascii-code-31.html
 */
export declare const ERROR_CONFIG_SEPARATOR: string;
//# sourceMappingURL=validationErrors.types.d.ts.map