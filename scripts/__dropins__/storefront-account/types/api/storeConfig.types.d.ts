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
export interface StoreConfigProps {
    base_media_url: string;
    minimum_password_length: number;
    required_character_classes_number: string;
    store_code: string;
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