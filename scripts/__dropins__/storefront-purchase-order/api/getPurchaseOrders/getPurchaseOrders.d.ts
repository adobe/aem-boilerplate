import { PurchaseOrderModel } from '../../data/models';

export declare const getPurchaseOrders: (filter?: any, pageSize?: number, currentPage?: number) => Promise<{
    totalCount: number;
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
    purchaseOrderItems: PurchaseOrderModel[];
}>;
//# sourceMappingURL=getPurchaseOrders.d.ts.map