import { FormValuesParams, ValidationApprovalFormError } from '../types/hooks';

/**
 * Validates all form fields and returns validation errors
 * This function contains the core validation logic for the approval rule form
 */
export declare const validateFormFields: (values: FormValuesParams) => ValidationApprovalFormError;
/**
 * Returns only the errors for fields that have been touched by the user
 * This prevents showing validation errors for fields the user hasn't interacted with yet
 */
export declare const getVisibleErrors: (allErrors: ValidationApprovalFormError, touchedFields: {
    [key: string]: boolean;
}) => ValidationApprovalFormError;
/**
 * Updates errors based on new validation results and touched fields
 * This is used for incremental validation as the user fills out the form
 */
export declare const updateValidationErrors: (newErrors: ValidationApprovalFormError, currentErrors: ValidationApprovalFormError, touchedFields: {
    [key: string]: boolean;
}) => ValidationApprovalFormError;
//# sourceMappingURL=formValidation.d.ts.map