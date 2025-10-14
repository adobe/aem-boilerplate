import { Container } from '@dropins/tools/types/elsie/src/lib';
import { AddressInput } from '../../data/models';

export interface AddressValidationProps {
    suggestedAddress: Partial<AddressInput> | null;
    handleSelectedAddress?: (payload: {
        selection: 'suggested' | 'original';
        address: AddressInput | null | undefined;
    }) => void;
}
export declare const AddressValidation: Container<AddressValidationProps>;
//# sourceMappingURL=AddressValidation.d.ts.map