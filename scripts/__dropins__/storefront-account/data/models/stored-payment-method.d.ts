import { PaymentCardProps } from '../../types';

/**
 * View model for {@link PaymentCard}: vault row + `publicHash` for list keys and delete.
 * Fields match {@link PaymentCardProps} (except `onRemove`, set by the container).
 */
export type StoredPaymentMethodDisplay = Pick<PaymentCardProps, 'cardBrand' | 'lastFourDigits' | 'expired' | 'variant'> & {
    publicHash: string;
};
//# sourceMappingURL=stored-payment-method.d.ts.map