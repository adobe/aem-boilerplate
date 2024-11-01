export interface StoreConfigProps {
    minimum_password_length: number;
    required_character_classes_number: string;
}
export interface GetStoreConfigResponse {
    data: {
        storeConfig: StoreConfigProps;
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=storeConfig.types.d.ts.map