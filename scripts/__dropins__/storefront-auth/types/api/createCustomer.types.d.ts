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
type customAttributesProps = {
    custom_attributes: Record<string, string>[];
};
type errorProps = {
    message: string;
};
export interface Customer {
    firstname: string;
    lastname: string;
    email: string;
}
interface CreateCustomerResponse {
    customer: Customer;
}
export interface DataCreateCustomerV2 {
    data: {
        createCustomerV2: CreateCustomerResponse & customAttributesProps;
    };
    errors?: errorProps[];
}
export interface DataCreateCustomer {
    data: {
        createCustomer: CreateCustomerResponse;
    };
    errors?: errorProps[];
}
export {};
//# sourceMappingURL=createCustomer.types.d.ts.map