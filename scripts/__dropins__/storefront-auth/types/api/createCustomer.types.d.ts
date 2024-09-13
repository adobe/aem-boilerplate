export interface Customer {
    firstname: string;
    lastname: string;
    email: string;
    is_subscribed: boolean;
    custom_attributes?: Record<string, string>[];
}
interface CreateCustomerResponse {
    customer: Customer;
}
interface DataCreateCustomerV2 {
    createCustomer: CreateCustomerResponse;
}
interface DataCreateCustomer {
    createCustomer: CreateCustomerResponse;
}
export interface CreateCustomerDataResponse {
    data: DataCreateCustomerV2 | DataCreateCustomer | null;
    errors?: {
        message: string;
    }[];
}
export {};
//# sourceMappingURL=createCustomer.types.d.ts.map