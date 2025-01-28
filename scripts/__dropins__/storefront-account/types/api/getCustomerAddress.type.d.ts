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
export type RegionProps = {
    region: string;
    region_code: string;
    region_id: string | number;
};
export interface UserAddressesProps {
    middlename: string;
    fax: string;
    prefix: string;
    suffix: string;
    firstname: string;
    lastname: string;
    city: string;
    company: string;
    country_code: string;
    region: RegionProps;
    telephone: string;
    id?: string;
    vat_id: string;
    postcode: string;
    street: string | string[] | [];
    street_multiline_2?: string;
    default_shipping: boolean;
    default_billing: boolean;
    custom_attributesV2: {
        code: string;
        value: string;
    }[];
}
export interface AddressResponse {
    data: {
        customer?: {
            addresses: UserAddressesProps[];
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomerAddress.type.d.ts.map