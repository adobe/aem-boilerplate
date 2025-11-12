import { RequisitionList } from '../data/models/requisitionList';

type UseRequisitionListSelectedItems = {
    currentRequisitionList: RequisitionList | null;
    setCurrentRequisitionList: (value: RequisitionList | null | ((prev: RequisitionList | null) => RequisitionList | null)) => void;
    selectedItems: Set<string>;
    setSelectedItems: (value: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
    handleItemSelection: (itemUid: string, isSelected: boolean) => void;
    handleSelectAll: () => void;
    handleSelectNone: () => void;
};
export declare function useRequisitionListSelectedItems(): UseRequisitionListSelectedItems;
export {};
//# sourceMappingURL=useRequisitionListSelectedItems.d.ts.map