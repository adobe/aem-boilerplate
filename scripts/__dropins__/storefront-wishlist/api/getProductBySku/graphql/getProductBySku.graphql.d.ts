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
export declare const GET_PRODUCT_BY_SKU = "\n  query GET_PRODUCT_BY_SKU($sku: String!) {\n    products(filter: { sku: { eq: $sku } }) {\n        items {\n          sku\n          name\n          thumbnail {\n            label\n            url\n          }\n          price_range {\n            minimum_price {\n              regular_price {\n                currency\n                value\n              }\n              final_price {\n                currency\n                value\n              }\n              discount {\n                amount_off\n                percent_off\n              }\n            }\n          }\n          stock_status\n          ... on SimpleProduct {\n            stock_status\n            options {\n              uid\n            }\n          }\n          ... on ConfigurableProduct {\n            configurable_options {\n              uid\n              attribute_uid\n              attribute_code\n              values {\n                uid\n              }\n            }\n            variants {\n              product {\n                sku\n                stock_status\n              }\n            }\n          }\n          ... on BundleProduct {\n            items {\n              uid\n              title\n              options {\n                uid\n                label\n                quantity\n              }\n            }\n          }\n        }\n      }\n    }\n";
//# sourceMappingURL=getProductBySku.graphql.d.ts.map