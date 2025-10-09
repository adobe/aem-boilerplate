import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { RequisitionListFormMode, RequisitionListFormValues } from '../../hooks/useRequisitionListForm';

export interface RequisitionListFormProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    mode: RequisitionListFormMode;
    defaultValues?: RequisitionListFormValues;
    error?: string | null;
    onSubmit: (values: RequisitionListFormValues) => Promise<void> | void;
    onCancel: () => void;
}
export declare const RequisitionListForm: FunctionComponent<RequisitionListFormProps>;
//# sourceMappingURL=RequisitionListForm.d.ts.map