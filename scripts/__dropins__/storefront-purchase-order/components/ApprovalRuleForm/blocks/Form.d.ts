import { CustomerRolePermissionsModel } from '../../../data/models';

declare const Form: ({ availableRequiresApprovalFrom, conditionOperators, availableAppliesTo, appliesToOptions, ruleTypeOptions, currencies, formValues, errors, touched, isLoading, permissions, handleSubmit, handleFieldTouch, handleSetFormValues, routeApprovalRulesList, t, }: {
    availableRequiresApprovalFrom: {
        id: string;
        name: string;
    }[];
    conditionOperators: {
        value: string;
        text: string;
    }[];
    availableAppliesTo: {
        id: string;
        name: string;
    }[];
    appliesToOptions: {
        value: string;
        text: string;
    }[];
    ruleTypeOptions: {
        value: string;
        text: string;
    }[];
    currencies: {
        value: string;
        text: string;
    }[];
    formValues: any;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isLoading: boolean;
    permissions?: CustomerRolePermissionsModel | undefined;
    handleSubmit: () => void;
    handleFieldTouch: (field: string) => void;
    handleSetFormValues: (field: string, value: any) => void;
    routeApprovalRulesList?: (() => string) | undefined;
    t: Record<string, string>;
}) => import("preact").JSX.Element;
export default Form;
//# sourceMappingURL=Form.d.ts.map