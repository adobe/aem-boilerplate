/********************************************************************
 * ADOBE CONFIDENTIAL
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