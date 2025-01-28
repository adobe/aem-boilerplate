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
export declare const GET_ATTRIBUTES_LIST = "\n  query GET_ATTRIBUTES_LIST($entityType: AttributeEntityTypeEnum!) {\n    attributesList(entityType: $entityType) {\n      items {\n        ... on CustomerAttributeMetadata {\n          multiline_count\n          sort_order\n          validate_rules {\n            name\n            value\n          }\n        }\n        ... on ReturnItemAttributeMetadata {\n          sort_order\n        }\n        code\n        label\n        default_value\n        frontend_input\n        is_unique\n        is_required\n        options {\n          is_default\n          label\n          value\n        }\n      }\n      errors {\n        type\n        message\n      }\n    }\n  }\n";
//# sourceMappingURL=getAttributesList.graphql.d.ts.map