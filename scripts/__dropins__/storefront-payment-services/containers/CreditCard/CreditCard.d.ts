import { RefObject } from 'preact/compat';

export declare enum CardTypes {
    Visa = "visa",
    MasterCard = "mastercard",
    Amex = "amex",
    Discover = "discover",
    Maestro = "maestro",
    Diners = "diners"
}
export declare enum FormFields {
    NUMBER = "number",
    EXPIRATION_DATE = "expirationDate",
    CVV = "cvv"
}
export interface CreditCardProps {
    /**
     * The URL to the Adobe Commerce GraphQL endpoint, such as "https://example.com/graphql".
     */
    apiUrl: string;
    /**
     * Should return a promise that resolves to the shopper`s cart ID.
     */
    getCartId: () => Promise<string>;
    /**
     * The credit card container may send GraphQL requests on behalf of the shopper. This requires GraphQL authorization,
     * which can be performed using authorization tokens or session cookies.
     *
     * For token-based authorization, the "getCustomerToken" function should return a customer token as a string, or null
     * for guest checkouts. The "getCustomerToken" function should not be provided for session-based authorization.
     *
     * For more information, see: https://developer.adobe.com/commerce/webapi/graphql/usage/authorization-tokens/.
     */
    getCustomerToken?: (() => string | null) | null;
    /**
     * Credit card form reference. Initially, { current: null } should be passed. Once rendered, the credit card
     * container will set the 'current' property to a { validate: () => boolean; submit: () => Promise<void> } object,
     * which parent containers should use to (programmatically) validate and submit the credit card form.
     */
    creditCardFormRef: RefObject<CreditCardFormRef>;
    /**
     * Called when payment flow is successful.
     */
    onSuccess: () => void;
    /**
     * Called when payment flow was aborted due to an error.
     */
    onError: (error: Error) => void;
}
export interface CreditCardFormRef {
    /**
     * Returns true only if all credit card form inputs are valid, and focuses the first
     * input that is invalid, if any.
     */
    validate: () => boolean;
    /**
     * Use this method to submit the credit card form and initiate the payment flow.
     */
    submit: () => Promise<void>;
}
export declare const CreditCard: ({ apiUrl, getCartId, getCustomerToken, creditCardFormRef, onSuccess, onError, ...props }: CreditCardProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=CreditCard.d.ts.map