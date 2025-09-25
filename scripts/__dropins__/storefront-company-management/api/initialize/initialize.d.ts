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
export interface CompanyDropinConfig {
    langDefinitions?: Record<string, Record<string, string>>;
    models?: Record<string, any>;
}
export declare const initialize: (config?: CompanyDropinConfig) => Promise<{
    success: boolean;
    config: CompanyDropinConfig;
}>;
//# sourceMappingURL=initialize.d.ts.map