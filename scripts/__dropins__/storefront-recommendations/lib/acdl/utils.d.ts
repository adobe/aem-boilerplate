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
/**
 * Utility functions for working with Adobe Client Data Layer (ACDL)
 */
/**
 * Set and return the Adobe Client Data Layer (ACDL)
 * @returns ACDL instance or an empty array if it doesn't exist
 */
export declare function getAdobeDataLayer(): any;
/**
 * Sets a context in the Adobe Client Data Layer (ACDL)
 * Logic based on: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/Base.ts#L6
 * @param name - The name of the context
 * @param data - The data to set in the context
 */
export declare function setContext<T>(name: string, data: T): void;
/**
 * Pushes an event to the Adobe Client Data Layer (ACDL)
 * Logic based on: https://github.com/adobe/commerce-events/blob/1973d0ce28471ef190fa06dad6359ffa0ab51db6/packages/storefront-events-sdk/src/Base.ts#L34
 * @param event - The event to push
 * @param contextName - The name of the context to add to the event
 * @param additionalContext - Additional context to add to the event
 */
export declare function pushEvent(event: string, contextName?: string, additionalContext?: any): void;
//# sourceMappingURL=utils.d.ts.map