import { AddressInput } from '../../data/models';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface AddressValidationProps extends HTMLAttributes<HTMLDivElement> {
    busy?: boolean;
    currentAddress: AddressInput | null | undefined;
    selection: 'suggested' | 'original' | null;
    suggestedAddress: AddressInput | null;
    onSelectionChange: (selection: 'suggested' | 'original') => void;
}
export declare function formatAddressLine(address: AddressInput | null | undefined): string[];
export declare const AddressValidation: FunctionComponent<AddressValidationProps>;
//# sourceMappingURL=AddressValidation.d.ts.map