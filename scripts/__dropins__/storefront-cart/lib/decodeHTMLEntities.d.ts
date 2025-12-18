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
 * Decodes HTML entities in a string (e.g., &quot; -> ", &amp; -> &)
 * Uses DOMParser to safely decode entities and extract text content.
 * Note: This will also strip any HTML tags from the decoded result.
 * @param text - The text containing HTML entities to decode
 * @returns The decoded text with HTML entities converted to their characters
 */
export declare const decodeHTMLEntities: (text: string) => string;
//# sourceMappingURL=decodeHTMLEntities.d.ts.map