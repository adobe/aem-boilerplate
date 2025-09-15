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
export declare const COMPANY_LEGAL_ADDRESS_FRAGMENT = "\n  fragment COMPANY_LEGAL_ADDRESS_FRAGMENT on CompanyLegalAddress {\n    street\n    city\n    region {\n      region\n      region_code\n      region_id\n    }\n    country_code\n    postcode\n    telephone\n  }\n";
export declare const COMPANY_BASIC_INFO_FRAGMENT = "\n  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {\n    id\n    name\n    email\n    legal_name\n    vat_tax_id\n    reseller_id\n  }\n";
export declare const COMPANY_SALES_REPRESENTATIVE_FRAGMENT = "\n  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {\n    firstname\n    lastname\n    email\n  }\n";
export declare const COMPANY_ADMIN_FRAGMENT = "\n  fragment COMPANY_ADMIN_FRAGMENT on Customer {\n    firstname\n    lastname\n    email\n    job_title\n  }\n";
export declare const COMPANY_FULL_FRAGMENT: string;
//# sourceMappingURL=CompanyFragment.graphql.d.ts.map