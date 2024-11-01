export interface ChangeCustomerPasswordProps {
    currentPassword: string;
    newPassword: string;
}
export interface ChangeCustomerPasswordResponse {
    data: {
        changeCustomerPassword: {
            email: string;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=updateCustomerPassword.types.d.ts.map