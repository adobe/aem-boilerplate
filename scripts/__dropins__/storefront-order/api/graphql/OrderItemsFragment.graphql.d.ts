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
export declare const PRODUCT_DETAILS_FRAGMENT = "\n  fragment PRODUCT_DETAILS_FRAGMENT on ProductInterface {\n    __typename\n    canonical_url\n    url_key\n    uid\n    name\n    sku\n    only_x_left_in_stock\n    gift_wrapping_price {\n      currency\n      value\n    }\n    stock_status\n    thumbnail {\n      label\n      url\n    }\n    price_range {\n      maximum_price {\n        regular_price {\n          currency\n          value\n        }\n      }\n    }\n  }\n";
export declare const PRICE_DETAILS_FRAGMENT = "\n  fragment PRICE_DETAILS_FRAGMENT on OrderItemInterface {\n    prices {\n      price_including_tax {\n        value\n        currency\n      }\n      original_price {\n        value\n        currency\n      }\n      original_price_including_tax {\n        value\n        currency\n      }\n      price {\n        value\n        currency\n      }\n    }\n  }\n";
export declare const GIFT_CARD_DETAILS_FRAGMENT = "\n  fragment GIFT_CARD_DETAILS_FRAGMENT on GiftCardOrderItem {\n    ...PRICE_DETAILS_FRAGMENT\n    gift_message {\n      ...GIFT_MESSAGE_FRAGMENT\n    }\n    gift_card {\n      recipient_name\n      recipient_email\n      sender_name\n      sender_email\n      message\n    }\n  }\n";
export declare const ORDER_ITEM_DETAILS_FRAGMENT = "\n  fragment ORDER_ITEM_DETAILS_FRAGMENT on OrderItemInterface {\n    gift_wrapping {\n      ...GIFT_WRAPPING_FRAGMENT\n    }\n    __typename\n    status\n    product_sku\n    eligible_for_return\n    product_name\n    product_url_key\n    id\n    quantity_ordered\n    quantity_shipped\n    quantity_canceled\n    quantity_invoiced\n    quantity_refunded\n    quantity_return_requested\n    gift_message {\n      ...GIFT_MESSAGE_FRAGMENT\n    }\n    product_sale_price {\n      value\n      currency\n    }\n    selected_options {\n      label\n      value\n    }\n    product {\n      ...PRODUCT_DETAILS_FRAGMENT\n    }\n    ...PRICE_DETAILS_FRAGMENT\n  }\n";
export declare const BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT = "\n  fragment BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT on BundleOrderItem {\n    ...PRICE_DETAILS_FRAGMENT\n    bundle_options {\n      uid\n      label\n      values {\n        uid\n        product_name\n      }\n    }\n  }\n";
export declare const DOWNLOADABLE_ORDER_ITEMS_FRAGMENT = "\n  fragment DOWNLOADABLE_ORDER_ITEMS_FRAGMENT on DownloadableOrderItem {\n    product_name\n    downloadable_links {\n      sort_order\n      title\n    }\n  }\n";
export declare const ORDER_ITEM_FRAGMENT = "\n  fragment ORDER_ITEM_FRAGMENT on OrderItemInterface {\n    ...ORDER_ITEM_DETAILS_FRAGMENT\n    ... on BundleOrderItem {\n      ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT\n    }\n    ... on GiftCardOrderItem {\n      ...GIFT_CARD_DETAILS_FRAGMENT\n      product {\n        ...PRODUCT_DETAILS_FRAGMENT\n      }\n    }\n    ...DOWNLOADABLE_ORDER_ITEMS_FRAGMENT\n  }\n\n  \n  fragment DOWNLOADABLE_ORDER_ITEMS_FRAGMENT on DownloadableOrderItem {\n    product_name\n    downloadable_links {\n      sort_order\n      title\n    }\n  }\n\n";
//# sourceMappingURL=OrderItemsFragment.graphql.d.ts.map