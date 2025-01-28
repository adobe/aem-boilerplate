/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
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