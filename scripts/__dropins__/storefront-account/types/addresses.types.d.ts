import { CustomerAddressesModel } from '../data/models';
import { FieldsProps } from './form.types';
import { SlotProps } from '@dropins/tools/types/elsie/src/src/lib';

export interface DefaultCheckBox extends Omit<FieldsProps, 'options'> {
}
export interface AddressCardContext {
    addressData: {
        label?: string | null;
        name?: string;
        orderNumber?: number;
        value?: string;
    }[];
}
export interface AddressesProps {
    hideActionFormButtons?: boolean;
    formName?: string;
    slots?: {
        [key: string]: SlotProps;
    };
    title?: string;
    addressFormTitle?: string;
    defaultSelectAddressId?: number | string;
    showFormLoader?: boolean;
    forwardFormRef?: HTMLInputElement;
    selectShipping?: boolean;
    selectBilling?: boolean;
    showSaveCheckBox?: boolean;
    saveCheckBoxValue?: boolean;
    selectable?: boolean;
    className?: string;
    withHeader?: boolean;
    minifiedView: boolean;
    withActionsInMinifiedView?: boolean;
    withActionsInFullSizeView?: boolean;
    inputsDefaultValueSet?: CustomerAddressesModel;
    addressesFormTitle?: string;
    showShippingCheckBox?: boolean;
    showBillingCheckBox?: boolean;
    shippingCheckBoxValue?: boolean;
    billingCheckBoxValue?: boolean;
    routeAddressesPage?: () => string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    onSubmit?: (event: Event, formValid: boolean) => Promise<void>;
    onAddressData?: (values: {} | CustomerAddressesModel | undefined) => void;
}
export interface AddressesWrapperProps extends Omit<AddressesProps, 'formName'> {
    inputName: string;
    minifiedViewKey: 'minifiedView' | 'fullSizeView';
}
export interface useAddressesProps extends Omit<AddressesProps, 'className' | 'inputsDefaultValueSet' | 'addressesFormTitle' | 'shippingCheckBoxValue' | 'billingCheckBoxValue' | 'showFormLoader' | 'title' | 'slots' | 'formName' | 'hideActionFormButtons'> {
}
export interface KeysSortOrderProps {
    name: string;
    orderNumber?: number;
    label?: string | null;
}
export interface AddressCardProps {
    slots?: {
        [key: string]: SlotProps;
    };
    selectShipping?: boolean;
    selectBilling?: boolean;
    selectable?: boolean;
    variant?: 'secondary' | 'primary';
    minifiedView: boolean;
    addressData: CustomerAddressesModel | undefined;
    keysSortOrder?: KeysSortOrderProps[];
    loading?: boolean;
    setAddressId?: (id: string) => void;
    handleRenderModal?: () => void | undefined;
    handleRenderForm?: () => void | undefined;
}
export interface AddressActionsProps {
    className?: string;
    selectable?: boolean;
    minifiedView?: boolean;
    addNewAddress?: boolean;
    viewAllAddressesText?: string;
    routeAddressesPage: (event: Event) => void;
}
export interface AddressModalProps {
    minifiedView: boolean;
    addressData?: CustomerAddressesModel;
    keysSortOrder?: KeysSortOrderProps[];
    open: boolean;
    submitLoading: boolean;
    onRemoveAddress: () => void;
    closeModal: () => void;
}
//# sourceMappingURL=addresses.types.d.ts.map