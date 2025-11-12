import { RequisitionList } from '../../data/models/requisitionList';

export type RequisitionListItemsInput = {
    sku: string;
    quantity: number;
    parent_sku?: string;
    selected_options?: string[];
    entered_options?: Array<{
        uid: string;
        value: string;
    }>;
};
export declare const addProductsToRequisitionList: (requisitionListUid: string, requisitionListItems: Array<RequisitionListItemsInput>) => Promise<RequisitionList | null>;
//# sourceMappingURL=addProductsToRequisitionList.d.ts.map