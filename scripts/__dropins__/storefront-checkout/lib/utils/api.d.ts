import { RenderAPI } from '../../types';

type AddressFormChange = {
    data: Record<string, any>;
    isDataValid: boolean;
};
export declare function setAddressOnCart({ type, debounceMs, placeOrderBtn, }: {
    type?: 'shipping' | 'billing';
    debounceMs?: number;
    placeOrderBtn?: RenderAPI;
}): ({ data, isDataValid }: AddressFormChange) => void;
export declare function estimateShippingCost({ debounceMs }: {
    debounceMs?: number | undefined;
}): ({ data, isDataValid }: AddressFormChange) => void;
export {};
//# sourceMappingURL=api.d.ts.map