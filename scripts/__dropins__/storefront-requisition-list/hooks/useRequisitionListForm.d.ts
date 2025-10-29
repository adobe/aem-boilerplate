import { RequisitionList } from '../data/models/requisitionList';

export type RequisitionListFormMode = 'create' | 'update';
export type RequisitionListFormValues = {
    name: string;
    description?: string;
};
type UseRequisitionListFormReturn = {
    error: string | null;
    submit: (values: RequisitionListFormValues) => Promise<RequisitionList | null>;
};
export declare function useRequisitionListForm(mode: RequisitionListFormMode, requisitionListUid?: string, onSuccess?: (rl: RequisitionList) => void, onError?: (msg: string) => void): UseRequisitionListFormReturn;
export {};
//# sourceMappingURL=useRequisitionListForm.d.ts.map