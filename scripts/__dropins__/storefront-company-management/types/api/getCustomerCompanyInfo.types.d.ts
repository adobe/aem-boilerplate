/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
export interface GetCustomerCompanyInfoResponse {
    data?: {
        customer?: {
            id: string;
            job_title?: string;
            telephone?: string;
            role?: {
                id: string;
                name: string;
            };
        };
        company?: {
            id: string;
            name: string;
        };
    };
    errors?: Array<{
        message: string;
        extensions: {
            category: string;
        };
    }>;
}
//# sourceMappingURL=getCustomerCompanyInfo.types.d.ts.map