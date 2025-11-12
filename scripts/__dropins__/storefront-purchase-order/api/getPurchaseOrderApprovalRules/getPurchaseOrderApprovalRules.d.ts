import { PurchaseOrderApprovalRuleModel } from '../../data/models';

export declare const getPurchaseOrderApprovalRules: (currentPage?: number, pageSize?: number) => Promise<{
    totalCount: number;
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
    items: PurchaseOrderApprovalRuleModel[];
}>;
//# sourceMappingURL=getPurchaseOrderApprovalRules.d.ts.map