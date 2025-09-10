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
export interface getCompanyResponse {
    data: {
        company: {
            id: string;
            name: string;
            email: string;
            legal_name?: string;
            vat_tax_id?: string;
            reseller_id?: string;
            legal_address?: {
                street: string[];
                city: string;
                region: {
                    region: string;
                    region_code: string;
                    region_id: number;
                };
                country_code: string;
                postcode: string;
                telephone?: string;
            };
            company_admin?: {
                id?: string;
                firstname: string;
                lastname: string;
                email: string;
                job_title?: string;
            };
            sales_representative?: {
                firstname: string;
                lastname: string;
                email: string;
            };
            available_payment_methods?: {
                code: string;
                title: string;
            }[];
            available_shipping_methods?: {
                code: string;
                title: string;
            }[];
        };
        customer?: {
            role?: {
                id: string;
                name: string;
                permissions: {
                    id: string;
                    text: string;
                    children?: {
                        id: string;
                        text: string;
                        children?: {
                            id: string;
                            text: string;
                        }[];
                    }[];
                }[];
            };
            status?: string;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCompany.types.d.ts.map