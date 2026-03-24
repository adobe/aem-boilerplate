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
export interface BlurHandlerOptions {
    containerRef: HTMLElement | null;
    itemSelected: boolean;
    initialValue: string;
    currentValue: string;
    onValueRestore: (value: string) => void;
    onClose: () => void;
}
/**
 * Handles blur logic for search component
 * Checks if focus moved outside component and restores initial value if needed
 */
export declare const handleSearchBlur: (options: BlurHandlerOptions) => void;
/**
 * Creates a blur handler with timeout
 */
export declare const createBlurHandler: (options: BlurHandlerOptions, delay?: number) => number;
/**
 * Clears blur timeout if exists
 */
export declare const clearBlurTimeout: (timeoutRef: number | null) => void;
//# sourceMappingURL=searchBlurHandler.d.ts.map