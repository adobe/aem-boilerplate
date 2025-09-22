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
export declare const NEGOTIABLE_QUOTE_FRAGMENT = "\n  fragment NegotiableQuoteFragment on RequestNegotiableQuoteOutput {\n    quote {\n      uid\n      created_at\n      status\n      buyer {\n        firstname\n        lastname\n      }\n      comments {\n        uid\n        created_at\n        author {\n          firstname\n          lastname\n        }\n      }\n      items {\n        product {\n          uid\n          sku\n          name\n          price_range {\n            maximum_price {\n              regular_price {\n                value\n              }\n            }\n          }\n        }\n        quantity\n      }\n      prices {\n        subtotal_excluding_tax {\n          value\n        }\n        subtotal_including_tax {\n          value\n        }\n        subtotal_with_discount_excluding_tax {\n          value\n        }\n        grand_total {\n          value\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=NegotiableQuoteFragment.d.ts.map