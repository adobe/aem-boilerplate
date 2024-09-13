import { AddressFormField } from '../../data/models/address-form-fields';

export type ValidityProps = {
    accept?: string;
    max?: string | number;
    maxLength?: number;
    min?: string | number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
};
export type InputValidation = 'alphanumeric' | 'alphanumeric-w-space' | 'alphanum-with-spaces' | 'alpha' | 'url' | 'numeric' | 'email';
export declare const validityProps: (rules: AddressFormField['validateRules']) => ValidityProps;
export type Patterns = {
    [key in InputValidation]: RegExp;
};
export declare const patterns: Patterns;
//# sourceMappingURL=validation.d.ts.map