export type AttributesListItems = {
    code: string;
    sort_order: string;
    default_value: null | string;
    frontend_class: null | string;
    multiline_count: number;
    entity_type: string;
    frontend_input: string;
    is_required: boolean;
    is_unique: boolean;
    label: string;
    options: {
        is_default: boolean;
        label: string;
        value: string;
    }[];
};
export interface GetAttributesListResponse {
    data: {
        attributesList: {
            items: AttributesListItems[];
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getAttributesList.types.d.ts.map