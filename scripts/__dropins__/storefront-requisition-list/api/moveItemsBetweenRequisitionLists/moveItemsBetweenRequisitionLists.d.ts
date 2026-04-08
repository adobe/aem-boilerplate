import { RequisitionList } from '../../data/models/requisitionList';

export interface MoveItemsResult {
    sourceList: RequisitionList | null;
    destinationList: RequisitionList | null;
}
export declare const moveItemsBetweenRequisitionLists: (sourceRequisitionListUid: string, destinationRequisitionListUid: string, requisitionListItemUids: string[], pageSize: number, currentPage: number) => Promise<MoveItemsResult | null>;
//# sourceMappingURL=moveItemsBetweenRequisitionLists.d.ts.map