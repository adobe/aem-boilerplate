import { PaymentServicesSDK, SdkConfig } from '@adobe-commerce/payment-services-sdk';

export declare enum SDKStatus {
    loading = "loading",
    ready = "ready",
    error = "error"
}
interface UsePaymentsSDKResult {
    paymentsSDK: PaymentServicesSDK | null;
    sdkStatus: SDKStatus;
}
export declare function usePaymentsSDK({ apiUrl, getCustomerToken }: SdkConfig, location: string): UsePaymentsSDKResult;
export {};
//# sourceMappingURL=usePaymentsSDK.d.ts.map