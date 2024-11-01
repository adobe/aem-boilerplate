export interface getCustomerShortResponse {
    data: {
        customer: {
            custom_attributes: {
                code: string;
                value: string | number | boolean;
            }[];
            firstname: string;
            lastname: string;
            email: string;
            date_of_birth: string;
            dob: string;
            gender: 1 | 2;
            middlename: string;
            prefix: string;
            suffix: string;
            created_at: string;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomer.types.d.ts.map