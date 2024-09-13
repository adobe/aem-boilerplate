import { AddressFormElement, AddressFormType } from '../../data/models/address-form-fields';
import { FunctionComponent, Ref } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface FieldsFormProps extends HTMLAttributes<HTMLDivElement> {
    addressType: AddressFormType;
    fields: AddressFormElement[];
    formRef: Ref<HTMLFormElement>;
    headingId: string;
    name: string;
}
export declare const FieldsForm: FunctionComponent<FieldsFormProps>;
//# sourceMappingURL=FieldsForm.d.ts.map