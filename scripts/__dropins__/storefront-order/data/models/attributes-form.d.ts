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
    required?: boolean;
    label?: string;
    options?: {
        is_default: boolean;
        label: string;
        value: string;
    }[];
    entityType?: string;
    className?: string;
    defaultValue?: string | boolean | number;
    fieldType?: FieldEnumList;
    multilineCount?: number;
    isUnique?: boolean;
    orderNumber: number;
    isHidden?: boolean;
    customUpperCode: string;
    validateRules: Record<string, string>[];
}
export interface AttributesFormModel extends AttributesFormItemsProps {
}
//# sourceMappingURL=attributes-form.d.ts.map