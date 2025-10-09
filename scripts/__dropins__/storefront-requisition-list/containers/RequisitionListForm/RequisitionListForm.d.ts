import { Container } from '@dropins/tools/types/elsie/src/lib';
import { RequisitionListFormMode, RequisitionListFormValues } from '../../hooks/useRequisitionListForm';
import { RequisitionList } from '../../data/models/requisitionList';

export interface RequisitionListFormProps {
    mode: RequisitionListFormMode;
    requisitionListUid?: string;
    defaultValues?: RequisitionListFormValues;
    onSuccess?: (newList: RequisitionList) => void;
    onError?: (message: string) => void;
    onCancel: () => void;
}
export declare const RequisitionListForm: Container<RequisitionListFormProps>;
//# sourceMappingURL=RequisitionListForm.d.ts.map