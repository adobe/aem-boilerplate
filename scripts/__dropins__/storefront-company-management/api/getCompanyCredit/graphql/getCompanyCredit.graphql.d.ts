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
export declare const GET_COMPANY_CREDIT = "\n  query GET_COMPANY_CREDIT \n    {\n        company {\n            credit {\n                available_credit {\n                    currency\n                    value\n                }\n                credit_limit {\n                    currency\n                    value\n                }\n                outstanding_balance {\n                    currency\n                    value\n                }\n            }\n        }\n    }\n";
//# sourceMappingURL=getCompanyCredit.graphql.d.ts.map