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
export type ErrorCode = string;
export declare enum ErrorCodes {
    INVALID_INPUT = "INVALID_INPUT",
    SERVER_ERROR = "SERVER_ERROR",
    UNAUTHENTICATED = "UNAUTHENTICATED",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    QUOTE_DATA_ERROR = "QUOTE_DATA_ERROR",
    QUOTE_PERMISSION_DENIED = "QUOTE_PERMISSION_DENIED",
    PERMISSION_DENIED = "PERMISSION_DENIED"
}
export interface ErrorClassifier {
    /**
     * The specific code to return if this classifier matches.
     */
    code: ErrorCode;
    /**
     * A function that returns `true` if it recognizes the error.
     * It must safely handle `unknown` inputs.
     */
    matches: (error: unknown) => boolean;
}
export declare const classifiers: ErrorClassifier[];
//# sourceMappingURL=classifiers.d.ts.map