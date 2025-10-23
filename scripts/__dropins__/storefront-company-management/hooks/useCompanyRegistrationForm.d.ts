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
export interface UseCompanyRegistrationFormProps {
    onSuccess?: (company: any) => void;
    onError?: (errors: string[]) => void;
}
export interface UseCompanyRegistrationFormReturn {
    formValues: Record<string, string | number | boolean | string[]>;
    fieldErrors: Record<string, string>;
    isSubmitting: boolean;
    loadingStoreConfig: boolean;
    fieldsConfig: any[];
    countryOptions: any[];
    regionOptions: any[];
    loadingCountries: boolean;
    handleInputChange: (values: Record<string, string | string[] | number | boolean>) => void;
    handleBlur: (event: Event) => void;
    handleFormSubmit: (event: SubmitEvent, isValid: boolean) => Promise<void>;
    translations: Record<string, string>;
    formTranslations: Record<string, string>;
}
export declare const useCompanyRegistrationForm: ({ onSuccess, onError, }: UseCompanyRegistrationFormProps) => UseCompanyRegistrationFormReturn;
//# sourceMappingURL=useCompanyRegistrationForm.d.ts.map