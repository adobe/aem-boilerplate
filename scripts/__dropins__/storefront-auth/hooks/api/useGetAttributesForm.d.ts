import { inputsDefaultValueSetProps } from '../../types';

interface UseGetAttributesFormProps {
    fieldsConfigForApiVersion1: {}[];
    apiVersion2: boolean;
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
}
export declare const useGetAttributesForm: ({ inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2, }: UseGetAttributesFormProps) => {
    fieldsListConfigs: {
        autocomplete?: string | undefined;
        code?: string;
        name?: string;
        id?: string;
        defaultValue?: string | boolean | number;
        entityType?: string;
        className?: string;
        fieldType?: import('../../data/models').FieldEnumList;
        multilineCount: number;
        required?: boolean;
        unique?: boolean;
        label?: string;
        orderNumber: number;
        options?: {
            is_default: boolean;
            label: string;
            value: string;
        }[];
        hidden?: boolean;
        customUpperCode: string;
    }[];
};
export {};
//# sourceMappingURL=useGetAttributesForm.d.ts.map