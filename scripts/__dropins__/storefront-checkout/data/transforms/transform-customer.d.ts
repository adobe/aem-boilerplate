import { GetCustomerQuery } from '../../__generated__/types';
import { Customer as CustomerModel, CustomAttribute as CustomAttributeModel } from '../models';

type Customer = GetCustomerQuery['customer'];
export declare const transformCustomAttributesV2: (data: ({
    __typename?: "AttributeSelectedOptions" | undefined;
} | {
    __typename?: "AttributeValue" | undefined;
    code: string;
    value: string;
} | null)[]) => CustomAttributeModel[];
declare const transformCustomer: (data: Customer) => CustomerModel | undefined;
export { transformCustomer };
//# sourceMappingURL=transform-customer.d.ts.map