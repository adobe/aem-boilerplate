import { inputsDefaultValueSetProps } from '../../types';
import { AttributesFormItemsProps } from '../../data/models';

interface UseGetAttributesFormProps {
    fieldsConfigForApiVersion1: {}[];
    apiVersion2: boolean;
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
}
export declare const useGetAttributesForm: ({ inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2, }: UseGetAttributesFormProps) => {
    fieldsListConfigs: AttributesFormItemsProps[];
};
export {};
//# sourceMappingURL=useGetAttributesForm.d.ts.map