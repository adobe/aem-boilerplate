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
export interface RequestReturnProps {
    orderUid?: string;
    contactEmail: string;
    items: {
        orderItemUid: string;
        quantityToReturn: number;
        selectedCustomAttributes?: {
            attribute_code: string;
            value: string;
        }[];
        enteredCustomAttributes?: {
            attribute_code: string;
            value: string;
        }[];
    }[];
}
export interface RequestGuestReturnProps extends RequestReturnProps {
    token: string;
    commentText: string;
}
export interface ReturnProps {
    uid: string;
    number: string;
    status: string;
    created_at: string;
}
interface ErrorsProps {
    message: string;
}
export interface RequestReturnResponse {
    data: {
        requestReturn: {
            return: ReturnProps;
        };
    };
    errors?: ErrorsProps[];
}
export interface RequestGuestReturnResponse {
    data: {
        requestGuestReturn: {
            return: ReturnProps;
        };
    };
    errors?: ErrorsProps[];
}
export {};
//# sourceMappingURL=requestReturn.types.d.ts.map