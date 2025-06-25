import { SlotProps } from '../../@adobe-commerce/elsie/src/lib';
import { CustomerAddressesModel } from '../data/models';

interface AddressFormActionsContext {
    handleUpdateAddress?: (event: Event, valid: boolean) => Promise<void | null | undefined>;
    handleCreateAddress?: (event: Event, valid: boolean) => Promise<void | null | undefined>;
    addressId: string | number;
}
interface AddressFormInputsContext {
    formActions: {
        handleChange: (event: Event) => void;
    };
}
export interface AddressFormProps {
    hideActionFormButtons?: boolean;
    formName?: string;
    showFormLoader?: boolean;
    showSaveCheckBox?: boolean;
    saveCheckBoxValue?: boolean;
    forwardFormRef?: HTMLInputElement;
    addressFormId?: string;
    className?: string;
    addressesFormTitle?: string;
    inputsDefaultValueSet?: CustomerAddressesModel;
    shippingCheckBoxValue?: boolean;
    billingCheckBoxValue?: boolean;
    showShippingCheckBox?: boolean;
    showBillingCheckBox?: boolean;
    isOpen?: boolean;
    fieldIdPrefix?: string;
    onSubmit?: () => Promise<void>;
    slots?: {
        AddressFormActions?: SlotProps<AddressFormActionsContext>;
        AddressFormInputs?: SlotProps<AddressFormInputsContext>;
    };
    onCloseBtnClick?: () => void;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    handleRenderForm?: () => void;
    onChange?: (values: Record<string, FormDataEntryValue>, inputValue: Record<string, string>, event: Event) => void;
}
export interface AddressFormWrapperProps extends AddressFormProps {
}
export interface useAddressFormProps extends Omit<AddressFormProps, 'className' | 'addressesFormTitle' | 'handleCloseForm' | 'forwardFormRef' | 'hideActionFormButtons'> {
}
export {};
//# sourceMappingURL=addressForm.types.d.ts.map