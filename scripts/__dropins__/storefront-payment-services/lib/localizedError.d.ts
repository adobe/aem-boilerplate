/**
 * Represents a user-friendly, localized error intended for UI display.
 *
 * @property {string} name - A localized, user-facing string that serves as the name of the error (e.g., "Network error").
 * @property {string} message - A localized, user-facing message that describes the error in detail (e.g., "An unexpected network error occurred.").
 *
 * @example
 *   throw new LocalizedError('Verbindingsfout', 'Er is een onverwachte netwerkfout opgetreden.');
 *
 *   // Usage
 *   try {
 *     // ...
 *   } catch (e) {
 *     if (e instanceof LocalizedError) {
 *       showError(e.name, e.message);
 *     }
 *   }
 */
declare class LocalizedError extends Error {
    constructor(localizedName: string, localizedMessage: string);
}
export declare function fromPaymentsSDKError(category: ErrorCategory, error: Error): LocalizedError;
export type ErrorCategory = 'CreditCard' | 'ApplePay';
export default LocalizedError;
//# sourceMappingURL=localizedError.d.ts.map