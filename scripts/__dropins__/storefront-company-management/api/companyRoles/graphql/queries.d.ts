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
export declare const GET_COMPANY_ROLES: string;
export declare const GET_COMPANY_ROLE: string;
export declare const GET_COMPANY_ACL_RESOURCES = "\n  query GetCompanyAclResources {\n    company {\n      acl_resources {\n        id\n        text\n        sort_order\n        children {\n          id\n          text\n          sort_order\n          children {\n            id\n            text\n            sort_order\n            children {\n              id\n              text\n              sort_order\n              children {\n                id\n                text\n                sort_order\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n";
export declare const IS_COMPANY_ROLE_NAME_AVAILABLE = "\n  query IsCompanyRoleNameAvailable($name: String!) {\n    isCompanyRoleNameAvailable(name: $name) {\n      is_role_name_available\n    }\n  }\n";
//# sourceMappingURL=queries.d.ts.map