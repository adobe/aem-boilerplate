import { DataCreateCustomerV2, DataCreateCustomer } from '../../types';
import { CustomerModel } from '../models';

type ApiResponse<T extends boolean> = T extends true ? DataCreateCustomerV2 : DataCreateCustomer;
export declare const transformCreateCustomer: <T extends boolean>(response: ApiResponse<T>, apiVersion2: T) => CustomerModel;
export {};
//# sourceMappingURL=transform-create-customer.d.ts.map