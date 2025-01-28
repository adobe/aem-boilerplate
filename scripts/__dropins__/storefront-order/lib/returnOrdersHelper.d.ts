/********************************************************************
 * ADOBE CONFIDENTIAL
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
declare const returnStatus: {
    readonly PENDING: "pending";
    readonly AUTHORIZED: "authorized";
    readonly PARTIALLY_AUTHORIZED: "partiallyAuthorized";
    readonly RECEIVED: "received";
    readonly PARTIALLY_RECEIVED: "partiallyReceived";
    readonly APPROVED: "approved";
    readonly PARTIALLY_APPROVED: "partiallyApproved";
    readonly REJECTED: "rejected";
    readonly PARTIALLY_REJECTED: "partiallyRejected";
    readonly DENIED: "denied";
    readonly PROCESSED_AND_CLOSED: "processedAndClosed";
    readonly CLOSED: "closed";
};
type ReturnStatusKey = keyof typeof returnStatus;
type ReturnStatusValue = (typeof returnStatus)[ReturnStatusKey];
type KeyValueObject = {
    [key: string]: any;
};
type returnAttributesType = Array<{
    attributeCode: string;
    value: string;
}>;
type normalizeAttributesTypes = {
    selectedCustomAttributes: returnAttributesType;
    enteredCustomAttributes: returnAttributesType;
};
export declare const cleanObjectKeys: (obj: KeyValueObject) => KeyValueObject;
export declare const modifyFieldsConfig: (fieldsConfig: any, index: number) => any;
export declare const replicateEntries: (objects: any[], n: number) => any[];
export declare const normalizeAttributes: (obj: Record<string, string>) => normalizeAttributesTypes;
export declare const formatReturnStatus: (str: string) => ReturnStatusValue | '';
export declare const processFormElement: (formsRef: any) => any[];
export declare const sortItemsByCondition: (order: any) => any[];
export {};
//# sourceMappingURL=returnOrdersHelper.d.ts.map