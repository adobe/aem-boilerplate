export interface confirmEmailResponse {
    data: {
        confirmEmail: {
            customer: {
                email: string;
            };
        };
    };
    errors?: {
        message: string;
    }[];
}
export interface confirmEmailProps {
    customerEmail: string;
    customerConfirmationKey: string;
}
//# sourceMappingURL=confirmEmail.types.d.ts.map