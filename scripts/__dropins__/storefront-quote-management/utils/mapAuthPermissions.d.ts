import { State } from '../types/state.types';

/**
 * Type definition for the auth/permissions event payload
 * Contains flat Adobe Commerce permission keys with boolean values
 */
export type AuthPermissionsPayload = {
    all?: boolean;
    'Magento_NegotiableQuote::all'?: boolean;
    'Magento_NegotiableQuote::manage'?: boolean;
    'Magento_NegotiableQuote::checkout'?: boolean;
    'Magento_NegotiableQuoteTemplate::all'?: boolean;
    'Magento_NegotiableQuoteTemplate::view_template'?: boolean;
    'Magento_NegotiableQuoteTemplate::manage'?: boolean;
    'Magento_NegotiableQuoteTemplate::generate_quote'?: boolean;
    [key: string]: boolean | undefined;
};
/**
 * Maps the auth/permissions event payload to internal permissions structure.
 *
 * Implements hierarchical permission checking:
 * 1. Top-level "all": If true, grants all permissions
 * 2. Module-level "::all": Grants all permissions for that module
 * 3. Specific permissions: Maps individual keys to internal flags
 *
 * @param payload - The raw auth/permissions event payload
 * @returns Typed permissions object matching the state structure
 *
 * @example
 * ```typescript
 * const permissions = mapAuthPermissions({
 *   "Magento_NegotiableQuote::manage": true,
 *   "Magento_NegotiableQuote::checkout": true
 * });
 * // Returns: { requestQuote: true, editQuote: true, deleteQuote: true, checkoutQuote: true, ... }
 * ```
 */
export declare function mapAuthPermissions(payload: AuthPermissionsPayload | null | undefined): State['permissions'];
//# sourceMappingURL=mapAuthPermissions.d.ts.map