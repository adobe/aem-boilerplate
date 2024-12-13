import { SlotProps } from '@dropins/tools/types/elsie/src/src/lib';
import { AttributesFormModel, Country, FieldEnumList, RegionTransform } from '../data/models';

export interface FieldsProps extends Omit<AttributesFormModel, 'options'> {
    className?: string;
    fieldType: FieldEnumList;
    id: string;
    options: Country[];
}
interface AddressFormInputsContext {
    formActions: {
        handleChange: (event: Event) => void;
    };
}
export type FormRef = {
    handleValidationSubmit: () => boolean;
    isDataValid: boolean;
};
export interface FormProps {
    isWaitingForResponse?: boolean;
    showSaveCheckBox?: boolean;
    saveCheckBoxAddress?: boolean;
    handleSaveCheckBoxAddress?: (event: Event) => void;
    regionOptions?: RegionTransform[] | [];
    slots?: {
        AddressFormInputs?: SlotProps<AddressFormInputsContext>;
    };
    forwardFormRef?: HTMLInputElement | any;
    fieldsConfig?: FieldsProps[] | [];
    name?: string;
    className?: string;
    children?: any;
    loading?: boolean;
    showFormLoader?: boolean;
    onSubmit?: (event: SubmitEvent, isValid: boolean) => Promise<void | null | undefined>;
    onChange?: (values: Record<string, unknown>, inputValue: Record<string, string>, event: Event) => void;
    setInputChange?: (values: Record<string, string | number | boolean>) => void;
}
export interface useFormProps extends Omit<FormProps, 'children' | 'className' | 'name' | 'forwardFormRef' | 'showSaveCheckBox' | 'saveCheckBoxAddress' | 'handleSaveCheckBoxAddress'> {
    formName: string;
}
export interface FormInputsProps {
    className?: string;
    errors?: Record<string, string>;
    values?: Record<string, string | number | boolean>;
    fields?: any;
    loading?: boolean;
    onChange?: (event: Event) => void;
    onBlur?: (event: Event) => void;
    onFocus?: (event: Event) => void;
    slots?: {
        [key: string]: SlotProps;
    };
}
export {};
//# sourceMappingURL=form.types.d.ts.map