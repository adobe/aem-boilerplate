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
export interface CountriesFormResponse {
    data: {
        storeConfig: {
            countries_with_required_region: string;
            optional_zip_countries: string;
        };
        countries: {
            two_letter_abbreviation: string;
            full_name_locale: string;
            available_regions: {
                code: string;
            }[] | null;
        }[];
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCountries.types.d.ts.map