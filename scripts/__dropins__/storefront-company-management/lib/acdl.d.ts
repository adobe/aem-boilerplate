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
declare global {
    interface Window {
        adobeDataLayer: any[];
    }
}
declare enum EventsList {
    EDIT_COMPANY_EVENT = "edit-company"
}
/**
 * Sets a context in the Adobe Client Data Layer (ACDL)
 * @param context - The context object to set
 */
declare const setContext: (context: Record<string, any>) => void;
/**
 * Pushes an event to the Adobe Client Data Layer (ACDL)
 * @param event - The event object to push
 */
declare const pushEvent: (event: Record<string, any>) => void;
/**
 * Publishes events to the Adobe Client Data Layer (ACDL)
 * @param eventType - The type of event to publish
 * @param eventParams - Parameters associated with the event
 * @returns null if the event type is not recognized
 */
declare const publishEvents: (eventType: string, eventParams: any) => null | undefined;
export { EventsList, publishEvents, pushEvent, setContext };
//# sourceMappingURL=acdl.d.ts.map