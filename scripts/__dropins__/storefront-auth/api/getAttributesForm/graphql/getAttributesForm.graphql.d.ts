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
export declare const GET_ATTRIBUTES_FORM = "\n  query GET_ATTRIBUTES_FORM($formCode: String!) {\n    attributesForm(formCode: $formCode) {\n      items {\n        code\n        default_value\n        entity_type\n        frontend_class\n        frontend_input\n        is_required\n        is_unique\n        label\n        options {\n          is_default\n          label\n          value\n        }\n        ... on CustomerAttributeMetadata {\n          multiline_count\n          sort_order\n          validate_rules {\n            name\n            value\n          }\n        }\n      }\n      errors {\n        type\n        message\n      }\n    }\n  }\n";
//# sourceMappingURL=getAttributesForm.graphql.d.ts.map