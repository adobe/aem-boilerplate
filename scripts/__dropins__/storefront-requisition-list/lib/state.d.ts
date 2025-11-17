import { RequisitionList } from '../data/models/requisitionList';

export type StoreConfig = {
    is_requisition_list_active?: string;
    company_enabled?: boolean;
    [key: string]: any;
};
type State = {
    authenticated: boolean;
    config: StoreConfig | undefined;
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