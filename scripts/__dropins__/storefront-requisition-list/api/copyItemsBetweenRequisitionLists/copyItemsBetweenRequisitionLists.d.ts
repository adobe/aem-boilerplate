import { RequisitionList } from '../../data/models/requisitionList';

export interface CopyItemsResult {
    destinationList: RequisitionList | null;
}
export declare const copyItemsBetweenRequisitionLists: (sourceRequisitionListUid: string, destinationRequisitionListUid: string, requisitionListItemUids: string[]) => Promise<CopyItemsResult | null>;
//# sourceMappingURL=copyItemsBetweenRequisitionLists.d.ts.map