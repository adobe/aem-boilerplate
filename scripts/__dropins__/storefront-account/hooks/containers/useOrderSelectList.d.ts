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
export declare const useOrderSelectList: () => {
    selectableDateList: {
        value: string;
        text: string;
    }[];
    selectedDate: string;
    selectedPage: number;
    handleSelectDate: (event: Event) => void;
    setSelectedPage: import('preact/hooks').Dispatch<import('preact/hooks').StateUpdater<number>>;
    handleSetFirstOrderDate: (date: string) => void;
};
//# sourceMappingURL=useOrderSelectList.d.ts.map