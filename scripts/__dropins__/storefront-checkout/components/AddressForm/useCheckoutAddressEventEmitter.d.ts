import { AddressFormType, AddressFormValues } from '../../data/models';

type useCheckoutAddressEventEmitterProps = {
    address: AddressFormValues;
    type: AddressFormType;
    isValid: () => boolean;
};
declare function useCheckoutAddressEventEmitter({ address, type, isValid, }: useCheckoutAddressEventEmitterProps): void;
export default useCheckoutAddressEventEmitter;
//# sourceMappingURL=useCheckoutAddressEventEmitter.d.ts.map