export declare const PRODUCT_DETAILS_FRAGMENT = "\n  fragment ProductDetails on ProductInterface {\n    __typename\n    canonical_url\n    url_key\n    uid\n    name\n    sku\n    only_x_left_in_stock\n    stock_status\n    thumbnail {\n      label\n      url\n    }\n    price_range {\n      maximum_price {\n        regular_price {\n          currency\n          value\n        }\n      }\n    }\n  }\n";
export declare const PRICE_DETAILS_FRAGMENT = "\n  fragment PriceDetails on OrderItemInterface {\n    prices {\n      price_including_tax {\n        value\n        currency\n      }\n      original_price {\n        value\n        currency\n      }\n      original_price_including_tax {\n        value\n        currency\n      }\n      price {\n        value\n        currency\n      }\n    }\n  }\n";
export declare const GIFT_CARD_DETAILS_FRAGMENT = "\n  fragment GiftCardDetails on GiftCardOrderItem {\n    ...PriceDetails\n    gift_message {\n      message\n    }\n    gift_card {\n      recipient_name\n      recipient_email\n      sender_name\n      sender_email\n      message\n    }\n  }\n";
export declare const ORDER_ITEM_DETAILS_FRAGMENT = "\n  fragment OrderItemDetails on OrderItemInterface {\n    __typename\n    status\n    product_sku\n    eligible_for_return\n    product_name\n    product_url_key\n    id\n    quantity_ordered\n    quantity_shipped\n    quantity_canceled\n    quantity_invoiced\n    quantity_refunded\n    product_sale_price {\n      value\n      currency\n    }\n    selected_options {\n      label\n      value\n    }\n    product {\n      ...ProductDetails\n    }\n    ...PriceDetails\n  }\n";
export declare const BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT = "\n  fragment BundleOrderItemDetails on BundleOrderItem {\n    ...PriceDetails\n    bundle_options {\n      uid\n      label\n      values {\n        uid\n        product_name\n      }\n    }\n  }\n";
//# sourceMappingURL=orderItemsFragment.graphql.d.ts.map