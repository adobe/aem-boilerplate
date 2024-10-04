import { AttributesFormItemsProps, FieldEnumList } from '../data/models';

export interface FormProps {
    fieldsConfig?: any;
    name?: string;
    className?: string;
    children?: any;
    isLoading: boolean;
    submitCallback?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name' | 'isLoading'> {
}
export interface FormInputsProps {
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean>;
    fields?: any;
    loading?: boolean;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
}
export interface FieldsProps extends Omit<AttributesFormItemsProps, 'options'> {
    className: string;
    fieldType: FieldEnumList;
    id: string;
    options: {
        value: string;
        text: string;
    }[];
}
//# sourceMappingURL=form.types.d.ts.map