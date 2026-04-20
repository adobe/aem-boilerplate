import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    /** When true, hides the section header (title). */
    withHeader?: boolean;
    /**
     * Compact layout for dashboard-style embeds: compact empty state and each payment
     * card on one row (brand, number, tag, Remove).
     */
    minifiedView?: boolean;
    /**
     * If set, only tokens whose `payment_method_code` equals or starts with one of
     * these values are shown (e.g. Payment Services vault codes).
     */
    filterPaymentMethodCodes?: string[];
}
export interface PaymentMethodsWrapperProps extends PaymentMethodsProps {
}
//# sourceMappingURL=paymentMethods.types.d.ts.map