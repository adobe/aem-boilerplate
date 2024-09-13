import { inputsDefaultValueSetProps } from '../../types';
import { SignUpFieldsProps } from '../../configs/defaultCreateUserConfigs';
import { AttributesFormItemsProps } from '../../data/models';

interface UseGetAttributesFormProps {
    fieldsConfigForApiVersion1: SignUpFieldsProps[];
    apiVersion2: boolean;
    inputsDefaultValueSet?: inputsDefaultValueSetProps[];
}
export declare const useGetAttributesForm: ({ inputsDefaultValueSet, fieldsConfigForApiVersion1, apiVersion2, }: UseGetAttributesFormProps) => {
    fieldsListConfigs: AttributesFormItemsProps[];
};
export {};
//# sourceMappingURL=useGetAttributesForm.d.ts.map