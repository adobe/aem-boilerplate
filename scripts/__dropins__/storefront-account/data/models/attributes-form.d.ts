/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
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
    code: string;
    name: string;
    id: string;
    required: boolean;
    label: string;
    options: {
        isDefault: boolean;
        text: string;
        value: string;
    }[];
    entityType: string;
    className: string;
    defaultValue: string | boolean | number;
    fieldType: FieldEnumList;
    multilineCount: number;
    isUnique: boolean;
    orderNumber: number;
    isHidden: boolean;
    customUpperCode: string;
    validateRules: Record<string, string | number | boolean>[];
}
export interface AttributesFormModel extends AttributesFormItemsProps {
}
//# sourceMappingURL=attributes-form.d.ts.map