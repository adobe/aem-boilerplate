export interface StoreConfigProps {
    base_media_url: string;
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