/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
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