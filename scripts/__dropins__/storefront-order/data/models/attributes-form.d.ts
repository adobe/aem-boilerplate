import { FieldEnumList } from '../../types';

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