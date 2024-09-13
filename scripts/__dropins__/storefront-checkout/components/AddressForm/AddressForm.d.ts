import { SaveAddressCommand } from '.';
import { PreselectedAddressFields } from '../../containers';
import { AddressFormType } from '../../data/models';
import { cartSignal } from '../../signals';
import { HTMLAttributes } from 'preact/compat';

export interface AddressFormProps extends HTMLAttributes<HTMLDivElement> {
    addressType: AddressFormType;
    autoFill?: boolean;
    headingId: string;
    name: string;
    onCheckoutDataUpdate?: () => Promise<void>;
    preselectedFields?: PreselectedAddressFields;
    saveAddressHandler: (command: SaveAddressCommand) => Promise<typeof cartSignal.value.data>;
}
export type AddressFormHandle = {
    triggerSaveAddress: (signal: AbortSignal) => Promise<typeof cartSignal.value.data> | undefined;
};
export declare const AddressForm: import('preact').FunctionalComponent<import('preact/compat').PropsWithoutRef<AddressFormProps> & {
    ref?: import('preact').Ref<AddressFormHandle> | undefined;
}>;
//# sourceMappingURL=AddressForm.d.ts.map