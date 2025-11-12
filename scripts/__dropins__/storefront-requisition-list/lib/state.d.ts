import { RequisitionList } from '../data/models/requisitionList';

type State = {
    authenticated: boolean;
    requisitionLists: RequisitionList[];
    requisitionListsLoading: boolean;
    requisitionListsVersion: number;
};
export declare const state: State;
export declare const setRequisitionLists: (lists: RequisitionList[]) => void;
export declare const addRequisitionList: (list: RequisitionList) => void;
export declare const updateRequisitionList: (list: RequisitionList) => void;
export declare const getRequisitionListsFromState: () => RequisitionList[];
export declare const setRequisitionListsLoading: (loading: boolean) => void;
export {};
//# sourceMappingURL=state.d.ts.map