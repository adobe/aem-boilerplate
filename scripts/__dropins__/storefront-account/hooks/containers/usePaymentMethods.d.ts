import { StoredPaymentMethodDisplay } from '../../data/models/stored-payment-method';

/** Sentinel for `actionError` when delete succeeds at the transport layer but returns false. */
export declare const PAYMENT_METHOD_REMOVE_FAILED = "__REMOVE_FAILED__";
export declare const usePaymentMethods: (filterPaymentMethodCodes?: string[]) => {
    items: StoredPaymentMethodDisplay[];
    loading: boolean;
    loadError: string | null;
    actionError: string | null;
    removingHash: string | null;
    removeToken: (publicHash: string) => Promise<void>;
    refetch: () => Promise<void>;
};
//# sourceMappingURL=usePaymentMethods.d.ts.map