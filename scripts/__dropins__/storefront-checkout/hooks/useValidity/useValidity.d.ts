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