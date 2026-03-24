import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';

export declare const updateRequisitionListItems: (requisitionListUid: string, requisitionListItems: Array<UpdateRequisitionListItemsInput>, pageSize: number, currentPage: number, enrichConfigurableProducts?: ((items: Item[]) => Promise<Item[]>) | undefined) => Promise<RequisitionList | null>;
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