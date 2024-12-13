import { OrderDataModel } from '../../data/models';
import { NormalizeAddressProps, UseCustomerDetails } from '../../types';

export declare const useCustomerDetails: ({ orderData }: UseCustomerDetails) => {
    order: OrderDataModel | undefined;
    normalizeAddress: {
        billingAddress: [] | NormalizeAddressProps[];
        shippingAddress: [] | NormalizeAddressProps[];
    };
    loading: boolean;
};
//# sourceMappingURL=useCustomerDetails.d.ts.map