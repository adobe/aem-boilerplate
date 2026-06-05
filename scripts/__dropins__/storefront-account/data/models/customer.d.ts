/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export interface CustomerDataModelShort {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    prefix: string;
    gender: 1 | 2 | string;
    suffix: string;
    email: string;
    createdAt: string;
    allowRemoteShoppingAssistance?: boolean;
    [key: string]: string | boolean | number | undefined;
}
export interface AccountModel {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    countryCode?: string;
    accountId?: string;
    accountType?: string;
    company?: string;
    customerGroup?: string;
}
//# sourceMappingURL=customer.d.ts.map