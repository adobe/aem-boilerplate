export interface ResponseAttributesFormItemsProps {
    code: string;
    sort_order: string;
    default_value: null | string;
    entity_type: string;
    frontend_class: null | string;
    multiline_count: number;
    frontend_input: string;
    is_required: boolean;
    is_unique: boolean;
    label: string;
    options: {
        is_default: boolean;
        label: string;
        value: string;
    }[];
}
export interface GetAttributesFormResponse {
    data: {
        attributesForm: {
            errors?: {
                message: string;
            }[];
            items?: ResponseAttributesFormItemsProps[];
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getAttributesForm.types.d.ts.map