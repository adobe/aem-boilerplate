import { PaymentMethodConfig } from '..';

export declare enum HandlerCode {
    PaymentOnAccount = "companycredit",
    PurchaseOrder = "purchaseorder"
}
export declare const handleRefNumberChange: (code: string, isRequired: boolean) => (this: any, ...args: any[]) => void;
export declare const resetHandlersCache: () => void;
export declare const createHandler: (code: HandlerCode) => PaymentMethodConfig;
export declare const defaultHandlers: {
    companycredit: PaymentMethodConfig;
    purchaseorder: PaymentMethodConfig;
};
//# sourceMappingURL=handlers.d.ts.map