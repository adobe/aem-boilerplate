export interface getCustomerDataResponse {
    data: {
        customer: {
            firstname: string;
            lastname: string;
            email: string;
            is_subscribed: boolean;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomerData.types.d.ts.map