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
/**
 * Represents a company entity
 */
export interface Company {
    id: string;
    name: string;
}
/**
 * Represents a company option for the picker component
 */
export interface CompanyOption {
    text: string;
    value: string;
}
/**
 * Contains customer's current company and available companies
 */
export interface CustomerCompanyInfo {
    currentCompany: Company;
    customerCompanies: CompanyOption[];
    customerGroupId: string;
}
/**
 * Return type for the useCompanyData hook
 */
export interface UseCompanyDataReturn {
    companies: CompanyOption[];
    currentCompany: CompanyOption;
    handleCompanyChange: (event: Event) => Promise<void>;
}
/**
 * GraphQL response wrapper
 */
export interface GraphQLResponse {
    company: Company;
    customer: {
        companies: {
            items: Company[];
        };
    };
    customerGroup: {
        uid: string;
    };
}
//# sourceMappingURL=company.d.ts.map