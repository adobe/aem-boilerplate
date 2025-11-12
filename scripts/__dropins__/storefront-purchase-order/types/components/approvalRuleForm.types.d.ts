import { FormValuesParams } from '../hooks';

export interface ApprovalRuleFormProps {
    className?: string;
    withHeader?: boolean;
    withWrapper?: boolean;
    approvalRuleID?: string;
    routeApprovalRulesList?: () => string;
    onSubmit?: (formValues: FormValuesParams) => Promise<void>;
    onChange?: (formValues: FormValuesParams) => void;
}
//# sourceMappingURL=approvalRuleForm.types.d.ts.map