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
/**
 * Cleans form values and converts to snake_case for API submission
 * - Handles role type logic (all_users vs specific_roles)
 * - Removes empty condition values (amount or quantity)
 * - Converts camelCase keys to snake_case
 */
export declare function cleanAndDeep(formValues: Record<string, any>): any;
//# sourceMappingURL=cleanAndDeep.d.ts.map