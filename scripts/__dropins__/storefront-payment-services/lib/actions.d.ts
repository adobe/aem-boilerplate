import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';

/**
 * Finalize Payment Services drop-in initialization with "ready" status.
 */
export declare function initializationSucceeded(paymentsSDK: {
    checkout: PaymentServicesSDK;
    productDetail: PaymentServicesSDK;
}): void;
/**
 * Finalize Payment Services drop-in initialization with "error" status.
 */
export declare function initializationFailed(): void;
//# sourceMappingURL=actions.d.ts.map