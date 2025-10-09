import { BillingAddressInput, ShippingAddressInput } from '../../data/models/api';
import { CartAddress } from '../../data/models/cart';

export declare const transformAddressFormValuesToAddressInput: (data: Record<string, any>) => ShippingAddressInput | BillingAddressInput;
export declare const transformCartAddressToFormValues: (address: CartAddress) => Record<string, any>;
//# sourceMappingURL=transformers.d.ts.map