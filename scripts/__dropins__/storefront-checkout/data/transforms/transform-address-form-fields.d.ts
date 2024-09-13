import { FetchAddressFormFieldsQuery, ValidationRuleEnum } from '../../__generated__/types';
import { AddressFormField } from '../models';

type AttributesForm = FetchAddressFormFieldsQuery['attributesForm'];
declare const transformAddressFormFields: (data: ({
    __typename?: "AttributeMetadata" | undefined;
    frontend_input?: import('../../__generated__/types').AttributeFrontendInputEnum | null | undefined;
    code: string;
    label?: string | null | undefined;
    default_value?: string | null | undefined;
    is_required: boolean;
    options: ({
        __typename?: "AttributeOptionMetadata" | undefined;
        label: string;
        value: string;
        is_default: boolean;
    } | null)[];
} | {
    __typename?: "CatalogAttributeMetadata" | undefined;
    frontend_input?: import('../../__generated__/types').AttributeFrontendInputEnum | null | undefined;
    code: string;
    label?: string | null | undefined;
    default_value?: string | null | undefined;
    is_required: boolean;
    options: ({
        __typename?: "AttributeOptionMetadata" | undefined;
        label: string;
        value: string;
        is_default: boolean;
    } | null)[];
} | {
    __typename?: "CustomerAttributeMetadata" | undefined;
    multiline_count?: number | null | undefined;
    sort_order?: number | null | undefined;
    frontend_input?: import('../../__generated__/types').AttributeFrontendInputEnum | null | undefined;
    code: string;
    label?: string | null | undefined;
    default_value?: string | null | undefined;
    is_required: boolean;
    validate_rules?: ({
        __typename?: "ValidationRule" | undefined;
        name?: ValidationRuleEnum | null | undefined;
        value?: string | null | undefined;
    } | null)[] | null | undefined;
    options: ({
        __typename?: "AttributeOptionMetadata" | undefined;
        label: string;
        value: string;
        is_default: boolean;
    } | null)[];
} | {
    __typename?: "ReturnItemAttributeMetadata" | undefined;
    frontend_input?: import('../../__generated__/types').AttributeFrontendInputEnum | null | undefined;
    code: string;
    label?: string | null | undefined;
    default_value?: string | null | undefined;
    is_required: boolean;
    options: ({
        __typename?: "AttributeOptionMetadata" | undefined;
        label: string;
        value: string;
        is_default: boolean;
    } | null)[];
} | null)[]) => AddressFormField[];
export { AttributesForm, transformAddressFormFields };
//# sourceMappingURL=transform-address-form-fields.d.ts.map