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
export declare const GET_REGIONS = "\n  query GET_REGIONS($countryCode: String!) {\n    country(id: $countryCode) {\n      id\n      available_regions {\n        id\n        code\n        name\n      }\n    }\n  }\n";
//# sourceMappingURL=getRegions.graphql.d.ts.map