import { TranslationList } from './fieldValidationRules';
import { FieldsProps } from '../../../types/form.types';

export type ValidationResult = {
    isValid: boolean;
    fieldErrors: Record<string, string>;
};
export type FormValidationConfig = {
    fieldsConfig: FieldsProps[];
    translations: TranslationList;
};
export declare const validateField: (fieldCode: string, value: string | string[] | number | boolean, config: FormValidationConfig) => string;
export declare const validateAllFields: (formData: Record<string, string | string[] | number | boolean>, config: FormValidationConfig) => ValidationResult;
export declare const updateFieldError: (currentErrors: Record<string, string>, fieldCode: string, errorMessage: string) => Record<string, string>;
export declare const validateSingleField: (fieldCode: string, value: string | string[] | number | boolean, fieldsConfig: FieldsProps[], translations: any) => string;
export declare const validateFormData: (formData: Record<string, string | string[] | number | boolean>, fieldsConfig: FieldsProps[], translations: any) => ValidationResult;
//# sourceMappingURL=formValidation.d.ts.map