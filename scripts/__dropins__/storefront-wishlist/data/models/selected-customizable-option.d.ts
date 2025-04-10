/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
export interface SelectedCustomizableOption {
    customizable_option_uid: string;
    label: string;
    type: string;
    required: boolean;
    sort_order: number;
    values: SelectedCustomizableOptionValue[];
}
export interface SelectedCustomizableOptionValue {
    customizable_option_value_uid: string;
    label: string;
    value: string;
}
//# sourceMappingURL=selected-customizable-option.d.ts.map