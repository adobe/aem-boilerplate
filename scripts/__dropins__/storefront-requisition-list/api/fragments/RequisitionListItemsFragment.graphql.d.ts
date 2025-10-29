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
export declare const REQUISITION_LIST_ITEMS_FRAGMENT = "\nfragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {\n  items {\n    uid\n    quantity\n    product {\n      sku\n    }\n    customizable_options {\n      customizable_option_uid\n      is_required\n      label\n      sort_order\n      type\n      values {\n        customizable_option_value_uid\n        label\n        value\n        price {\n          type\n          units\n          value\n        }\n      }\n    }\n    ... on ConfigurableRequisitionListItem {\n      configurable_options {\n        configurable_product_option_uid\n        configurable_product_option_value_uid\n        option_label\n        value_label\n      }\n    }\n    ... on DownloadableRequisitionListItem {\n      links {\n        price\n        sample_url\n        sort_order\n        title\n        uid\n      }\n      samples {\n        sample_url\n        sort_order\n        title\n      }\n    }\n    ... on GiftCardRequisitionListItem {\n      gift_card_options {\n        amount {\n          currency\n          value\n        }\n        custom_giftcard_amount {\n          currency\n          value\n        }\n        message\n        recipient_email\n        recipient_name\n        sender_name\n        sender_email\n      }\n    }\n  }\n  page_info {\n    page_size\n    current_page\n    total_pages\n  }\n}\n";
//# sourceMappingURL=RequisitionListItemsFragment.graphql.d.ts.map