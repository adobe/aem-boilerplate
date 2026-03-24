/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 * Copyright 2025 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
export declare const CUSTOMER_ORDER_FRAGMENT = "\n  fragment CUSTOMER_ORDER_FRAGMENT on CustomerOrder {\n    token\n    email\n    shipping_method\n    payment_methods {\n      name\n      type\n    }\n    shipments {\n      id\n      number\n      tracking {\n        title\n        number\n        carrier\n      }\n    }\n    number\n    id\n    order_date\n    carrier\n    status\n    items {\n      status\n      product_name\n      id\n      quantity_ordered\n      quantity_shipped\n      quantity_invoiced\n      product_sku\n      product_url_key\n      product {\n        sku\n        small_image {\n          url\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=CustomerOrderFragment.graphql.d.ts.map