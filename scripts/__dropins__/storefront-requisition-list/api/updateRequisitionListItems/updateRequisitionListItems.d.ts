import { RequisitionList } from '../../data/models/requisitionList';

export declare const updateRequisitionListItems: (requisitionListUid: string, requisitionListItems: Array<UpdateRequisitionListItemsInput>) => Promise<RequisitionList | null>;
type UpdateRequisitionListItemsInput = {
    item_id: string;
    quantity?: number;
    entered_options?: Array<{
        uid: string;
        value: string;
    }>;
    selected_options?: Array<string>;
};
export {};
//# sourceMappingURL=updateRequisitionListItems.d.ts.map