type customAttributesProps = {
    custom_attributes: Record<string, string>[];
};
type errorProps = {
    message: string;
};
export interface Customer {
    firstname: string;
    lastname: string;
    email: string;
    is_subscribed: boolean;
}
interface CreateCustomerResponse {
    customer: Customer;
}
export interface DataCreateCustomerV2 {
    data: {
        createCustomerV2: CreateCustomerResponse & customAttributesProps;
    };
    errors?: errorProps[];
}
export interface DataCreateCustomer {
    data: {
        createCustomer: CreateCustomerResponse;
    };
    errors?: errorProps[];
}
export {};
//# sourceMappingURL=createCustomer.types.d.ts.map