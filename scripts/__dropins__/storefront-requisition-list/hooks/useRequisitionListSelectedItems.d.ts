import { RequisitionList } from '../data/models/requisitionList';

type UseRequisitionListSelectedItems = {
    currentRequisitionList: RequisitionList;
    setCurrentRequisitionList: (value: RequisitionList | ((prev: RequisitionList) => RequisitionList)) => void;
    selectedItems: Set<string>;
    setSelectedItems: (value: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
    handleItemSelection: (itemUid: string, isSelected: boolean) => void;
    handleSelectAll: () => void;
    handleSelectNone: () => void;
};
export declare function useRequisitionListSelectedItems(requisitionList: RequisitionList): UseRequisitionListSelectedItems;
export {};
//# sourceMappingURL=useRequisitionListSelectedItems.d.ts.map