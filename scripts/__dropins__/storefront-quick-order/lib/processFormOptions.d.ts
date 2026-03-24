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
export interface ProcessedFormOptions {
    optionUIDs: string[];
    enteredOptions: {
        uid: string;
        value: string;
    }[];
}
/**
 * Processes form data to extract product options
 * Separates base64-encoded configurable options (optionUIDs) from custom entered options
 */
export declare const processFormOptions: (formData: FormData) => ProcessedFormOptions;
//# sourceMappingURL=processFormOptions.d.ts.map