import { PurchaseOrderModel } from '../../data/models';

export declare const approvePurchaseOrders: (uids: string | string[]) => Promise<{
    errors: {
        message: string;
        type: string;
    }[];
    purchaseOrders: PurchaseOrderModel[];
}>;
//# sourceMappingURL=approvePurchaseOrders.d.ts.map