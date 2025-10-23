import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface AddressInput {
    /** City name */
    city: string;
    /** Optional company name */
    company?: string;
    /** Two-letter country code (e.g., 'US') */
    countryCode: string;
    /** First name */
    firstname: string;
    /** Last name */
    lastname: string;
    /** Postal/ZIP code */
    postcode: string;
    /** Optional state/province name */
    region?: string;
    /** Optional state/province ID */
    regionId?: number;
    /** Whether to save this address to the customer's address book */
    saveInAddressBook?: boolean;
    /** Street address lines (array) */
    street: string[];
    /** Phone number */
    telephone: string;
    /**
     * Additional input (optional custom fields for the address).
     * These fields will be merged into the address data sent to GraphQL.
     * Standard fields take precedence over additional fields to prevent
     * accidental override of required address attributes.
     *
     * @example
     * ```ts
     * additionalInput: {
     *   vat_id: 'GB123456789',
     *   custom_attribute: 'value',
     *   delivery_instructions: 'Leave at door'
     * }
     * ```
     */
    additionalInput?: Record<string, any>;
}
export interface SetShippingAddressInput {
    /** The unique ID of the negotiable quote */
    quoteUid: string;
    /** The ID of a saved customer address (use this OR addressData, not both) */
    addressId?: number;
    /** New address data (use this OR addressId, not both) */
    addressData?: AddressInput;
}
/**
 * Sets or updates the shipping address for a negotiable quote.
 *
 * @param input - The input parameters for setting the shipping address
 * @param input.quoteUid - The unique ID of the negotiable quote
 * @param input.addressId - Optional ID of a saved customer address (use this OR addressData)
 * @param input.addressData - Optional new address data (use this OR addressId)
 * @param input.addressData.additionalInput - Optional additional address fields to pass through to GraphQL
 * @returns Promise that resolves to the updated quote model with shipping addresses including uid field
 * @throws Error if validation fails or GraphQL operation fails
 *
 * @example
 * ```ts
 * // Using a saved address
 * const quote = await setShippingAddress({
 *   quoteUid: 'quote-123',
 *   addressId: 5
 * });
 *
 * // Using new address data
 * const quote = await setShippingAddress({
 *   quoteUid: 'quote-123',
 *   addressData: {
 *     firstname: 'John',
 *     lastname: 'Doe',
 *     street: ['123 Main St'],
 *     city: 'San Francisco',
 *     countryCode: 'US',
 *     postcode: '94103',
 *     telephone: '555-1234'
 *   }
 * });
 *
 * // Using address data with additional custom fields
 * const quote = await setShippingAddress({
 *   quoteUid: 'quote-123',
 *   addressData: {
 *     firstname: 'John',
 *     lastname: 'Doe',
 *     street: ['123 Main St'],
 *     city: 'San Francisco',
 *     countryCode: 'US',
 *     postcode: '94103',
 *     telephone: '555-1234',
 *     additionalInput: {
 *       vat_id: 'GB123456789',
 *       custom_attribute_1: 'value1',
 *       delivery_instructions: 'Leave at door'
 *     }
 *   }
 * });
 *
 * // Access address identifier
 * if (quote?.shippingAddresses?.[0]) {
 *   console.log('Address UID:', quote.shippingAddresses[0].uid);
 * }
 * ```
 */
export declare const setShippingAddress: (input: SetShippingAddressInput) => Promise<NegotiableQuoteModel | null>;
//# sourceMappingURL=setShippingAddress.d.ts.map