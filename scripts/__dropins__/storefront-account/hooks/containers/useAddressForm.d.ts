import { CustomerAddressesModel, RegionTransform } from '../../data/models';
import { useAddressFormProps } from '../../types';
import { VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export declare const findNonEmptyObject: (obj1: Record<string, unknown> | undefined, obj2: CustomerAddressesModel | undefined) => CustomerAddressesModel | Record<string, unknown>;
export declare const useAddressForm: ({ showFormLoader, showSaveCheckBox, saveCheckBoxValue, addressFormId, billingCheckBoxValue, shippingCheckBoxValue, showShippingCheckBox, showBillingCheckBox, inputsDefaultValueSet, onCloseBtnClick, onSuccess, onError, formName, }: useAddressFormProps) => {
    regionOptions: [] | RegionTransform[];
    saveCheckBoxAddress: boolean;
    inLineAlert: {
        text: string;
        type: 'success' | 'warning' | 'error';
        icon?: VNode<HTMLAttributes<SVGSVGElement>> | undefined;
    };
    addressId: string;
    submitLoading: boolean;
    normalizeFieldsConfig: {
        customUpperCode: string;
        defaultValue?: string | number | boolean | undefined;
        options?: any[] | undefined;
        required?: boolean | undefined;
        disabled?: boolean | undefined;
    }[];
    handleSaveCheckBoxAddress: (event: Event) => void;
    handleUpdateAddress: (event: Event, valid: boolean) => Promise<null | undefined>;
    handleCreateAddress: (event: Event, valid: boolean) => Promise<void>;
    handleOnCloseForm: () => void;
    handleInputChange: (values: Record<string, string | number | boolean>) => void;
};
//# sourceMappingURL=useAddressForm.d.ts.map