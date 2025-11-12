import { FormValuesParams, FormState } from '../types/hooks';

export declare const RULE_TYPE_OPTIONS_KEYS: {
    readonly GRAND_TOTAL: "ruleTypeGrandTotal";
    readonly SHIPPING_INCL_TAX: "ruleTypeShippingInclTax";
    readonly NUMBER_OF_SKUS: "ruleTypeNumberOfSkus";
};
export declare const CONDITION_OPERATORS_KEYS: {
    readonly MORE_THAN: "conditionOperatorMoreThan";
    readonly LESS_THAN: "conditionOperatorLessThan";
    readonly MORE_THAN_OR_EQUAL_TO: "conditionOperatorMoreThanOrEqualTo";
    readonly LESS_THAN_OR_EQUAL_TO: "conditionOperatorLessThanOrEqualTo";
};
export declare const APPLIES_TO_OPTIONS_KEYS: {
    readonly ALL_USERS: "appliesToAllUsers";
    readonly SPECIFIC_ROLES: "appliesToSpecificRoles";
};
/**
 * Initial values for the approval rule form
 * Used when creating a new rule
 */
export declare const INITIAL_FORM_VALUES: FormValuesParams;
/**
 * Initial state for the form reducer
 * Includes form values, loading states, and validation
 */
export declare const INITIAL_FORM_STATE: FormState;
/**
 * Fields that must be touched (validated) on form submission
 */
export declare const REQUIRED_FIELDS_ON_SUBMIT: {
    readonly name: true;
    readonly appliesTo: true;
    readonly ruleValue: true;
    readonly approvers: true;
};
/**
 * Translation keys for validation error messages
 */
export declare const VALIDATION_ERROR_KEYS: {
    readonly REQUIRED: "PurchaseOrders.approvalRuleForm.errorsMessages.required";
    readonly APPROVERS: "PurchaseOrders.approvalRuleForm.errorsMessages.approvers";
    readonly FAILED_TO_LOAD: "Failed to load metadata. Please try again.";
    readonly FAILED_TO_CREATE: "Failed to create approval rule. Please try again.";
};
/**
 * Creates rule type options for the dropdown
 * @param t - Translation function
 */
/**
 * Creates rule type options for the dropdown
 * @param t - Translation function
 */
export declare const createRuleTypeOptions: (t: Record<string, string>) => {
    text: string;
    value: string;
}[];
/**
 * Creates condition operator options for the dropdown
 * @param t - Translation function
 */
export declare const createConditionOperators: (t: Record<string, string>) => {
    text: string;
    value: string;
}[];
/**
 * Creates "applies to" options for the dropdown
 * @param t - Translation function
 */
export declare const createAppliesToOptions: (t: Record<string, string>) => {
    text: string;
    value: string;
}[];
//# sourceMappingURL=approvalRuleForm.config.d.ts.map