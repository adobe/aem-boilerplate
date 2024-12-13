export interface CustomerModel {
    firstName: string;
    lastName: string;
    email: string;
    isSubscribed: boolean;
    customAttributes?: Record<string, string>[];
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=customer-data.d.ts.map