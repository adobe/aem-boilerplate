import { PurchaseOrderModel } from '../../data/models';

export declare const validatePurchaseOrders: (uids: string | string[]) => Promise<{
    errors: {
        message: string;
        type: string;
    }[];
    purchaseOrders: PurchaseOrderModel[];
}>;
//# sourceMappingURL=validatePurchaseOrders.d.ts.map