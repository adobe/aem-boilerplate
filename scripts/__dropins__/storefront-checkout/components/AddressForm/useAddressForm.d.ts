import { AddressFormErrors, AddressFormType, AddressFormValues } from '../../data/models';
import { cartSignal } from '../../signals';
import { RefObject } from 'preact';

export type DefaultValues = {
    country_id?: string;
};
export type AddressFormState = {
    address: AddressFormValues;
    errors: AddressFormErrors;
};
export type SaveAddressCommand = {
    signal?: AbortSignal;
    address: AddressFormValues;
};
export type LoadAutoFillProps = {
    values: AddressFormValues;
    triggerAutoSave: boolean;
};
export type UseAddressFormProps = {
    defaultValues?: DefaultValues;
    formRef: RefObject<HTMLFormElement>;
    onCheckoutDataUpdate?: () => Promise<void>;
    preselection?: AddressFormValues;
    saveAddressHandler: (command: SaveAddressCommand) => Promise<typeof cartSignal.value.data>;
    type: AddressFormType;
};
export declare const useAddressForm: ({ defaultValues, formRef, onCheckoutDataUpdate, preselection, saveAddressHandler, type, }: UseAddressFormProps) => {
    address: AddressFormValues;
    errors: Record<string, string>;
    loadAutoFill: ({ values, triggerAutoSave, }: LoadAutoFillProps) => void;
    dismissError: (code: string) => void;
    onChange: (event: Event) => void;
    onSelection: (event: Event) => void;
    onBlur: (event: Event) => void;
    onInvalid: (event: Event) => void;
    setAddress: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<AddressFormValues>>;
};
//# sourceMappingURL=useAddressForm.d.ts.map