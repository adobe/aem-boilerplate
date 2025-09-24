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
export declare const GET_COUNTRIES_QUERY = "\n  query getCountries {\n    countries {\n      id\n      two_letter_abbreviation\n      three_letter_abbreviation\n      full_name_locale\n      full_name_english\n      available_regions {\n        id\n        code\n        name\n      }\n    }\n    storeConfig {\n      countries_with_required_region\n      optional_zip_countries\n    }\n  }\n";
//# sourceMappingURL=getCountries.graphql.d.ts.map