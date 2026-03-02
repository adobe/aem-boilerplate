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
export declare const GET_CUSTOMER_ORDERS_LIST = "\n  query GET_CUSTOMER_ORDERS_LIST(\n    $currentPage: Int\n    $pageSize: Int\n    $filter: CustomerOrdersFilterInput\n    $sort: CustomerOrderSortInput\n  ) {\n    customer {\n      returns {\n        items {\n          uid\n          number\n          order {\n            id\n          }\n        }\n      }\n      orders(\n        currentPage: $currentPage\n        pageSize: $pageSize\n        filter: $filter\n        sort: $sort\n      ) {\n        page_info {\n          page_size\n          total_pages\n          current_page\n        }\n        date_of_first_order\n        total_count\n        items {\n          token\n          email\n          shipping_method\n          payment_methods {\n            name\n            type\n          }\n          shipping_address {\n            ...ADDRESS_FRAGMENT\n          }\n          billing_address {\n            ...ADDRESS_FRAGMENT\n          }\n          shipments {\n            id\n            number\n            tracking {\n              title\n              number\n              carrier\n            }\n          }\n          number\n          id\n          order_date\n          carrier\n          status\n          items {\n            status\n            product_name\n            id\n            quantity_ordered\n            quantity_shipped\n            quantity_invoiced\n            product_sku\n            product_url_key\n            product {\n              sku\n              small_image {\n                url\n              }\n            }\n          }\n          total {\n            ...ORDER_SUMMARY_FRAGMENT\n          }\n        }\n      }\n    }\n  }\n  \n  fragment ADDRESS_FRAGMENT on OrderAddress {\n    city\n    company\n    country_code\n    fax\n    firstname\n    lastname\n    middlename\n    postcode\n    prefix\n    region\n    region_id\n    street\n    suffix\n    telephone\n    vat_id\n  }\n\n  \n  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {\n    grand_total {\n      value\n      currency\n    }\n    grand_total_excl_tax {\n      value\n      currency\n    }\n    total_giftcard {\n      currency\n      value\n    }\n    subtotal_excl_tax {\n      currency\n      value\n    }\n    subtotal_incl_tax {\n      currency\n      value\n    }\n    taxes {\n      amount {\n        currency\n        value\n      }\n      rate\n      title\n    }\n    total_tax {\n      currency\n      value\n    }\n    total_shipping {\n      currency\n      value\n    }\n    discounts {\n      amount {\n        currency\n        value\n      }\n      label\n    }\n  }\n\n";
//# sourceMappingURL=getOrderHistoryList.graphql.d.ts.map