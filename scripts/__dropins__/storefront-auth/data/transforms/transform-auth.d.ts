export declare const loginContext: (ctx: any) => {
    personalEmail: {
        address: any;
    };
    userAccount: {
        login: boolean;
    };
    commerce: {
        commerceScope: {
            storeCode: any;
        };
    };
};
export declare const logoutContext: (ctx: any) => {
    userAccount: {
        logout: boolean;
    };
    commerce: {
        commerceScope: {
            storeCode: any;
        };
    };
};
export declare const createAccountContext: (ctx: any) => {
    personalEmail: {
        address: any;
    };
    userAccount: {
        updateProfile: any;
    };
    commerce: {
        commerceScope: {
            storeCode: any;
        };
    };
};
//# sourceMappingURL=transform-auth.d.ts.map