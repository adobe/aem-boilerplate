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
/**
 * This file defines an array of class names that should be excluded
 * from specific init Recaptcha logic.
 *
 * The array contains class names representing elements that should be
 * ignored when certain operations, such as focusing or applying event
 * handlers, are executed.
 *
 * By checking if an element's class matches any class in this array,
 * you can easily bypass unwanted logic for those elements, ensuring
 * precise and predictable behavior in your application.
 *
 */
export declare const excludedFocusClasses: string[];
//# sourceMappingURL=excludedFocusClasses.d.ts.map