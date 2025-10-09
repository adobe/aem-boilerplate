import { RequisitionList } from '../data/models/requisitionList';

export type RequisitionListFormMode = 'create' | 'edit';
export type RequisitionListFormValues = {
    name: string;
    description?: string;
};
export declare function useRequisitionListForm(mode: RequisitionListFormMode, requisitionListUid?: string, onSuccess?: (rl: RequisitionList) => void, onError?: (msg: string) => void): {
    readonly error: string | null;
    readonly submit: (values: RequisitionListFormValues) => Promise<RequisitionList | null>;
};
//# sourceMappingURL=useRequisitionListForm.d.ts.map