export interface OptionValidationRule {
    type: 'string' | 'number' | 'email';
    required: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    values?: number[] | string[];
}
export interface Option {
    name: string;
    uid: string;
    label: string;
    validationRule: OptionValidationRule;
}
export interface OptionField {
    id: string;
    value: string;
}
export interface ValuesModel {
    sku: string;
    quantity: number;
    optionsUIDs?: string[];
    enteredOptions?: Array<{
        uid: string;
        value: string;
    }>;
}
//# sourceMappingURL=values-model.d.ts.map