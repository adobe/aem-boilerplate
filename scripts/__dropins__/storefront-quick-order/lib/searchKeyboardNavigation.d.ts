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
 * WCAG 2.1 compliant keyboard navigation for combobox with listbox pattern.
 * Focus always remains on the input element, visual indication via aria-activedescendant.
 * Reference: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */
/**
 * Calculates next active index when ArrowDown is pressed
 * Returns next index in list or current if at end
 */
export declare const handleArrowDown: (currentIndex: number, itemsLength: number) => number;
/**
 * Calculates next active index when ArrowUp is pressed
 * Returns previous index or -1 to return focus to input
 */
export declare const handleArrowUp: (currentIndex: number) => number;
/**
 * Moves visual focus to first item in list (Home key)
 */
export declare const handleHomeKey: () => number;
/**
 * Moves visual focus to last item in list (End key)
 */
export declare const handleEndKey: (itemsLength: number) => number;
/**
 * Handles Enter key press on active item
 * Returns true if item was selected, false otherwise
 */
export declare const handleEnterKey: <T>(activeIndex: number, items: T[], onItemSelect: (item: T) => void) => boolean;
/**
 * Handles Escape key press - restores initial value and closes results
 */
export declare const handleEscapeKey: (initialValue: string, inputRef: HTMLElement | null, onValueRestore: (value: string) => void, onClose: () => void) => void;
//# sourceMappingURL=searchKeyboardNavigation.d.ts.map