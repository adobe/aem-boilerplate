export interface storeConfigProps {
    autocomplete_on_storefront: boolean;
    minimum_password_length: number;
    required_character_classes_number: string;
    create_account_confirmation: boolean;
    customer_access_token_lifetime: number;
}
export interface getStoreConfigResponse {
    data: {
        storeConfig: storeConfigProps;
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=storeConfig.types.d.ts.map