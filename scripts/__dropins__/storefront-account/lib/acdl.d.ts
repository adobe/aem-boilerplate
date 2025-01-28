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
declare enum EventsList {
    EDIT_ACCOUNT_EVENT = "edit-account"
}
export declare function getAdobeDataLayer(): any;
/**
 * Pushes an event to the Adobe Client Data Layer (ACDL)
 * Logic based on: https://github.com/adobe/commerce-events/blob/1973d0ce28471ef190fa06dad6359ffa0ab51db6/packages/storefront-events-sdk/src/Base.ts#L34
 */
declare function pushEvent(event: string, additionalContext?: any): void;
declare const publishEvents: (eventType: string, eventParams: any) => null | undefined;
export { EventsList, publishEvents, pushEvent };
//# sourceMappingURL=acdl.d.ts.map