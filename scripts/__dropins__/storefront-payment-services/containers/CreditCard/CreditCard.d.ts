import { RefObject } from 'preact/compat';
import { default as LocalizedError } from '../../lib/localizedError';

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
     * Should return a promise that resolves to the shopper`s cart ID.
     */
    getCartId: () => Promise<string>;
    /**
     * Credit card form reference. Initially, { current: null } should be passed. Once rendered, the credit card
     * container will set the 'current' property to a { validate: () => boolean; submit: () => Promise<void> } object,
     * which parent containers should use to (programmatically) validate and submit the credit card form.
     */
    creditCardFormRef: RefObject<CreditCardFormRef>;
    /**
     * Called when payment flow is successful.
     */
    onSuccess: (result: {
        cartId: string;
    }) => void;
    /**
     * Called when the payment flow was aborted due to an error.
     *
     * The function receives an object with two properties, { name: string, message: string }, containing the localized
     * error name and message. Both properties are user-facing and can be translated using the
     * "PaymentServices.CreditCard.errors" language definitions.
     */
    onError: (localizedError: LocalizedError) => void;
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
export declare const CreditCard: ({ getCartId, creditCardFormRef, onSuccess, onError, ...props }: CreditCardProps) => import("preact/compat").JSX.Element;
//# sourceMappingURL=CreditCard.d.ts.map