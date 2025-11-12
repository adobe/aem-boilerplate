import { CompanyRole, CustomerRolePermissionsModel } from '../../data/models';

export interface FormState {
    formValues: FormValuesParams;
    isLoading: boolean;
    submitError: string | null;
    availableAppliesTo: CompanyRole[];
    availableRequiresApprovalFrom: CompanyRole[];
    errors: ValidationApprovalFormError;
    touched: {
        [key: string]: boolean;
    };
    currencyCodesList: Array<{
        text: string;
        value: string;
    }>;
}
export type FormAction = {
    type: 'SET_LOADING';
    payload: boolean;
} | {
    type: 'SET_SUBMIT_ERROR';
    payload: string | null;
} | {
    type: 'SET_FORM_VALUES';
    payload: FormValuesParams;
} | {
    type: 'SET_AVAILABLE_APPLIES_TO';
    payload: CompanyRole[];
} | {
    type: 'SET_AVAILABLE_APPROVERS';
    payload: CompanyRole[];
} | {
    type: 'SET_ERRORS';
    payload: ValidationApprovalFormError;
} | {
    type: 'SET_TOUCHED';
    payload: {
        [key: string]: boolean;
    };
} | {
    type: 'SET_CURRENCIES';
    payload: Array<{
        text: string;
        value: string;
    }>;
} | {
    type: 'UPDATE_FIELD';
    payload: {
        key: string;
        value: string | number | boolean | string[];
    };
} | {
    type: 'TOUCH_FIELD';
    payload: string;
} | {
    type: 'MARK_FIELDS_TOUCHED';
    payload: {
        [key: string]: boolean;
    };
};
export type ValidationApprovalFormError = {
    [key: string]: string;
};
export type ConditionAttributeType = 'GRAND_TOTAL' | 'SHIPPING_INCL_TAX' | 'NUMBER_OF_SKUS';
export type OperatorType = 'MORE_THAN' | 'LESS_THAN' | 'MORE_THAN_OR_EQUAL_TO' | 'LESS_THAN_OR_EQUAL_TO';
export type ConditionOperatorType = 'MORE_THAN' | 'LESS_THAN' | 'MORE_THAN_OR_EQUAL_TO' | 'LESS_THAN_OR_EQUAL_TO';
export type StatusType = 'ENABLED' | 'DISABLED';
export type MoneyParams = {
    currency: string;
    value: number | string;
};
export type FormValuesParams = {
    status: StatusType;
    name: string;
    description: string;
    roleType: string;
    appliesTo: string[];
    condition: {
        quantity: number | string;
        amount: MoneyParams;
        attribute: ConditionAttributeType;
        operator: ConditionOperatorType;
    };
    approvers: string[];
};
export interface UseApprovalRuleFormProps {
    t: Record<string, string>;
    approvalRuleID?: string;
    routeApprovalRulesList?: () => string;
    onSubmit?: (formValues: FormValuesParams) => Promise<void>;
    onChange?: (formValues: FormValuesParams) => void;
    permissions?: CustomerRolePermissionsModel;
    loadingPermissions?: boolean;
}
export type PickerOption = {
    text: string;
    value: string;
};
export interface UseApprovalRuleFormReturn {
    formValues: FormValuesParams;
    ruleTypeOptions: PickerOption[];
    conditionOperators: PickerOption[];
    currencies: PickerOption[];
    appliesToOptions: PickerOption[];
    handleSetFormValues: (key: string, value: string | number | boolean | string[]) => void;
    handleSubmit: () => void;
    availableAppliesTo: CompanyRole[];
    availableRequiresApprovalFrom: CompanyRole[];
    errors: {
        [key: string]: string;
    };
    touched: {
        [key: string]: boolean;
    };
    handleFieldTouch: (fieldName: string) => void;
    isLoading: boolean;
    submitError: string | null;
    formLoading: boolean;
}
//# sourceMappingURL=useApprovalRuleForm.types.d.ts.map