import { AddressFormType } from '../../data/models';
import { Cart } from '../../data/models/cart';
import { Customer } from '../../data/models/customer';

export declare const getCustomerAddress: ({ addressType, customer, }: {
    addressType: AddressFormType;
    customer: Customer;
}) => import('../../data/models').CustomerAddress | undefined;
export declare const getCartAddress: ({ addressType, cart, }: {
    addressType: AddressFormType;
    cart: Cart;
}) => import('../../data/models/address').Address | undefined;
//# sourceMappingURL=utils.d.ts.map