import { FormValuesParams } from '../hooks';

export interface ApprovalRuleFormProps {
    withHeader?: boolean;
    withWrapper?: boolean;
    className?: string;
    approvalRuleID?: string;
    routeApprovalRulesList: () => string;
    onSubmit?: (formValues: FormValuesParams) => Promise<void>;
    onChange?: (formValues: FormValuesParams) => void;
}
//# sourceMappingURL=approvalRuleForm.types.d.ts.map