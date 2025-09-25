import { CompanyFormData } from '../data/models/company';

export declare enum FieldTypeEnum {
    TEXT = "TEXT",
    EMAIL = "EMAIL",
    TEL = "TEL",
    SELECT = "SELECT",
    HIDDEN = "HIDDEN"
}
export interface FieldsProps {
    code: string;
    name: string;
    id: string;
    required: boolean;
    label: string;
    options: {
        isDefault: boolean;
        text: string;
        value: string;
    }[];
    className?: string;
    defaultValue: string | boolean | number;
    fieldType: FieldTypeEnum;
    isHidden: boolean;
    customUpperCode: string;
    validateRules?: Record<string, string | number | boolean>[];
    placeholder?: string;
    disabled?: boolean;
    isRequiredRegion?: boolean;
    isRequiredPostCode?: boolean;
    maxlength?: number;
}
export interface CompanyFormInputsContext {
    formData: CompanyFormData;
    formActions: {
        handleChange: (field: keyof CompanyFormData, value: string | string[]) => void;
    };
}
export interface CompanyFormSectionContext {
    formData: CompanyFormData;
    handleInputChange: (values: Record<string, string | string[] | number | boolean>) => void;
    isSubmitting: boolean;
    errors: string[];
}
export interface CompanyFormSlots {
    [key: string]: (context?: any) => any;
}
export interface FormProps {
    regionOptions?: {
        text: string;
        value: string;
    }[];
    countryOptions?: {
        text: string;
        value: string;
    }[];
    fieldIdPrefix?: string;
    slots?: CompanyFormSlots;
    fieldsConfig?: FieldsProps[];
    values?: Record<string, string | number | boolean | string[]>;
    errors?: Record<string, string>;
    name?: string;
    className?: string;
    children?: any;
    loading?: boolean;
    showFormLoader?: boolean;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    onChange?: (values: Record<string, string | string[] | number | boolean>) => void;
    onBlur?: (event: Event) => void;
}
export interface FormInputsProps {
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean | string[]>;
    formData?: Record<string, string | number | boolean>;
    fields?: FieldsProps[];
    loading?: boolean;
    regionOptions?: {
        text: string;
        value: string;
    }[];
    countryOptions?: {
        text: string;
        value: string;
    }[];
    onChange?: (event: Event) => void;
    handleInputChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    fieldIdPrefix?: string;
    slots?: CompanyFormSlots;
}
//# sourceMappingURL=form.types.d.ts.map