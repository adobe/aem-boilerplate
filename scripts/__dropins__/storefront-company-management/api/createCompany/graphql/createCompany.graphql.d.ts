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
export declare const CREATE_COMPANY_MUTATION = "\n  mutation CreateCompany($input: CompanyCreateInput!) {\n    createCompany(input: $input) {\n      company {\n        id\n        name\n        email\n        legal_name\n        vat_tax_id\n        reseller_id\n        legal_address {\n          street\n          city\n          region {\n            region_code\n            region\n            region_id\n          }\n          postcode\n          country_code\n          telephone\n        }\n        company_admin {\n          id\n          firstname\n          lastname\n          email\n          job_title\n          telephone\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=createCompany.graphql.d.ts.map