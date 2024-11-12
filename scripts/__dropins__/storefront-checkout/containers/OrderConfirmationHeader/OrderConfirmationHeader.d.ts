import { FunctionComponent } from 'preact';
import { OrderDataModel } from '../../data/models';
import { CustomerAddressInput } from '../../__generated__/types';

type SignUpInputsDefaultValueSetProps = {
    code: string;
    defaultValue: string;
};
export type OrderConfirmationHeaderProps = {
    onSignUpClick?: ({ inputsDefaultValueSet, addressesData, }: {
        inputsDefaultValueSet: SignUpInputsDefaultValueSetProps[];
        addressesData: CustomerAddressInput[];
    }) => void;
    orderData: OrderDataModel;
};
export declare const OrderConfirmationHeader: FunctionComponent<OrderConfirmationHeaderProps>;
export {};
//# sourceMappingURL=OrderConfirmationHeader.d.ts.map