import { Customer as CustomerModel } from '../models';
import { GetCustomerQuery } from '../../__generated__/types';

type Customer = GetCustomerQuery['customer'];
declare const transformCustomer: (data: Customer) => CustomerModel | null;
export { Customer, transformCustomer };
//# sourceMappingURL=transform-customer.d.ts.map