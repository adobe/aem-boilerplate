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
declare const dictionary: Record<string, string>;
export declare const groupMultilineFields: (inputObj: Record<string, any>) => Record<string, any>;
export declare const separateKeys: (inputData: Record<string, any>) => Record<keyof typeof dictionary, unknown>;
declare const _default: (fields?: Record<string, any>, isForm?: boolean) => Record<string, unknown>;
export default _default;
//# sourceMappingURL=normalizeGetAddressData.d.ts.map