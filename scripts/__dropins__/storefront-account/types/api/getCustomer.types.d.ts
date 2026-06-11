/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export interface getCustomerShortResponse {
    data: {
        customer: {
            custom_attributes: {
                code: string;
                value?: string | number | boolean | null;
                selected_options?: {
                    value?: string | null;
                }[];
            }[];
            firstname: string;
            lastname: string;
            email: string;
            date_of_birth: string;
            gender: 1 | 2;
            middlename: string;
            prefix: string;
            suffix: string;
            created_at: string;
            allow_remote_shopping_assistance?: boolean;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomer.types.d.ts.map