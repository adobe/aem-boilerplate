import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { CustomerAddressesModel } from '../../data/models';

export interface AddressValidationProps extends HTMLAttributes<HTMLDivElement> {
    busy?: boolean;
    originalAddress: CustomerAddressesModel | null;
    selection: 'suggested' | 'original' | null;
    suggestedAddress: CustomerAddressesModel | null;
    onSelectionChange: (selection: 'suggested' | 'original') => void;
}
export declare function formatAddressLine(address: CustomerAddressesModel | null | undefined): string[];
export declare const AddressValidation: FunctionComponent<AddressValidationProps>;
//# sourceMappingURL=AddressValidation.d.ts.map