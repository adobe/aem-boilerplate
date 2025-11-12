import { PurchaseOrderModel } from '../../data/models';

export declare const rejectPurchaseOrders: (uids: string | string[]) => Promise<{
    errors: {
        message: string;
        type: string;
    }[];
    purchaseOrders: PurchaseOrderModel[];
}>;
//# sourceMappingURL=rejectPurchaseOrders.d.ts.map