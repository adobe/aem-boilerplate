import { inputsDefaultValueSetProps } from '../../types';

interface UseGetAttributesFormProps {
    fieldsConfigForApiVersion1: {}[];
    apiVersion2: boolean;
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
}
export declare const useGetAttributesForm: ({ inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2, }: UseGetAttributesFormProps) => {
    fieldsListConfigs: {
        autocomplete?: string | undefined;
        code?: string | undefined;
        name?: string | undefined;
        id?: string | undefined;
        defaultValue?: string | number | boolean | undefined;
        entityType?: string | undefined;
        className?: string | undefined;
        fieldType?: import('../../data/models').FieldEnumList | undefined;
        multilineCount: number;
        required?: boolean | undefined;
        unique?: boolean | undefined;
        label?: string | undefined;
        orderNumber: number;
        options?: {
            is_default: boolean;
            label: string;
            value: string;
        }[] | undefined;
        hidden?: boolean | undefined;
        customUpperCode: string;
    }[];
};
export {};
//# sourceMappingURL=useGetAttributesForm.d.ts.map