import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { AttributesFormItemsProps, FieldEnumList } from '../data/models';
import { ComponentChildren } from 'preact';

export interface FormProps {
    slots?: {
        [key: string]: SlotProps;
    };
    fieldsConfig?: any;
    name?: string;
    className?: string;
    children?: any;
    loading: boolean;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name' | 'loading'> {
}
export interface FormInputsProps {
    slots?: {
        [key: string]: SlotProps;
    };
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean>;
    fields?: any;
    loading?: boolean;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
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
export type FormElementProps = {
    item: any;
    valueMessage: string;
    errorConfig: string;
    className: string;
    itemClassName: string;
    loading?: boolean;
    onBlur?: (e: any) => void;
    onChange?: (e: any) => void;
    onFocus?: (e: any) => void;
};
export type FieldElementProps = {
    item: any;
    errorConfig: string;
    className: string;
    itemClassName: string;
    loading?: boolean;
    children: ComponentChildren;
};
export type FormSlotProps = {
    slots?: {
        [key: string]: SlotProps;
    };
    item: any;
    handleOnChange?: (e: any) => void;
    handleOnBlur?: (e: any) => void;
    handleOnFocus?: (e: any) => void;
    errorConfig: string;
    errors: Record<string, string>;
};
//# sourceMappingURL=form.types.d.ts.map