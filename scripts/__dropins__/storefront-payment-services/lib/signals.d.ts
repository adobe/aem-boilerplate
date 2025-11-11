import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';

/**
 * Payment Services SDK signal. Invariants:
 *  - (paymentsSDK !== null) -> sdk.Payment.init() called and awaited for all locations
 */
export declare const paymentsSDK: import('@preact/signals-core').ReadonlySignal<{
    checkout?: PaymentServicesSDK | undefined;
    productDetail?: PaymentServicesSDK | undefined;
}>;
/**
 * Payment Services drop-in status signal.
 */
export declare const status: import('@preact/signals-core').ReadonlySignal<"ready" | "initializing" | "error">;
//# sourceMappingURL=signals.d.ts.map