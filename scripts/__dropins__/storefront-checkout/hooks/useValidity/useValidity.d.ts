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
export type Translations = {
    badInput: string;
    patternMismatch: string;
    rangeOverflow: string;
    rangeUnderflow: string;
    tooLong: string;
    tooShort: string;
    typeMismatch: string;
    valueMissing: string;
};
type FormElement = HTMLInputElement | HTMLSelectElement;
export declare const useValidity: (translations: Translations) => {
    errors: Record<string, string>;
    dismissError: (code: string) => void;
    validateFormElement: (formElement: FormElement) => void;
    resetErrors: () => void;
};
export {};
//# sourceMappingURL=useValidity.d.ts.map