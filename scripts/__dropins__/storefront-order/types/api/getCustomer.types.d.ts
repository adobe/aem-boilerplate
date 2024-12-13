export interface getCustomerShortResponse {
    data: {
        customer: {
            firstname: string;
            lastname: string;
            email: string;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomer.types.d.ts.map