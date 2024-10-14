export declare enum FieldEnumList {
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    DATETIME = "DATETIME",
    DROPDOWN = "DROPDOWN",
    FILE = "FILE",
    GALLERY = "GALLERY",
    HIDDEN = "HIDDEN",
    IMAGE = "IMAGE",
    MEDIA_IMAGE = "MEDIA_IMAGE",
    MULTILINE = "MULTILINE",
    MULTISELECT = "MULTISELECT",
    PRICE = "PRICE",
    SELECT = "SELECT",
    TEXT = "TEXT",
    TEXTAREA = "TEXTAREA",
    UNDEFINED = "UNDEFINED",
    VISUAL = "VISUAL",
    WEIGHT = "WEIGHT",
    EMPTY = ""
}
export interface AttributesFormItemsProps {
    code?: string;
    name?: string;
    id?: string;
    defaultValue?: string | boolean | number;
    entityType?: string;
    className?: string;
    fieldType?: FieldEnumList;
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
}
export interface AttributesFormModel extends AttributesFormItemsProps {
}
//# sourceMappingURL=attributes-form.d.ts.map