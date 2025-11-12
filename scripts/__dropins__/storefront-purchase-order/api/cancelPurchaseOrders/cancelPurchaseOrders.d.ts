import { PurchaseOrderModel } from '../../data/models';

export declare const cancelPurchaseOrders: (uids: string | string[]) => Promise<{
    errors: {
        message: string;
        type: string;
    }[];
    purchaseOrders: PurchaseOrderModel[];
}>;
//# sourceMappingURL=cancelPurchaseOrders.d.ts.map