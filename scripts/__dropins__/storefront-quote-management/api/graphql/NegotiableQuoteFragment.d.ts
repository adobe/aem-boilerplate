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
export declare const NEGOTIABLE_QUOTE_FRAGMENT = "\n  fragment NegotiableQuoteFragment on NegotiableQuote {\n    uid\n\t\tname\n\t\tcreated_at\n    status\n    sales_rep_name\n    expiration_date\n\t\tbuyer {\n\t\t\tfirstname\n\t\t\tlastname\n\t\t}\n\t\tcomments {\n      uid\n      created_at\n      author {\n        firstname\n        lastname\n      }\n      text\n    }\n\t\titems {\n      product {\n        name\n        sku\n        uid\n\t\t\t\tstock_status\n\t\t\t\tquantity\n        price_range {\n          maximum_price {\n            regular_price {\n              value\n            }\n          }\n        }\n      }\n\t\t\tprices {\n\t\t\t\tprice {\n\t\t\t\t\tcurrency\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\toriginal_item_price {\n\t\t\t\t\tcurrency\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\toriginal_row_total {\n\t\t\t\t\tcurrency\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\trow_total {\n\t\t\t\t\tcurrency\n\t\t\t\t\tvalue\n\t\t\t\t}\n        catalog_discount {\n\t\t\t\t\tamount_off\n\t\t\t\t\tpercent_off\n\t\t\t\t}\n\t\t\t\tdiscounts {\n\t\t\t\t\tlabel\n\t\t\t\t\tvalue\n\t\t\t\t\tamount {\n\t\t\t\t\t\tcurrency\n\t\t\t\t\t\tvalue\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n      quantity\n    }\n    history {\n      uid\n      created_at\n      author {\n        firstname\n        lastname\n      }\n      change_type\n      changes {\n        comment_added {\n          comment\n        }\n        statuses {\n          changes {\n            new_status\n            old_status\n          }\n        }\n        expiration {\n          new_expiration\n          old_expiration\n        }\n      }\n\t  }\n    prices {\n      subtotal_excluding_tax {\n\t\t\t\tcurrency\n\t\t\t\tvalue\n\t\t\t}\n\t\t\tapplied_taxes {\n\t\t\t\tamount {\n\t\t\t\t\tcurrency\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\tlabel\n\t\t\t}\n\t\t\tgrand_total {\n\t\t\t\tcurrency\n\t\t\t\tvalue\n\t\t\t}\n    }\n  }\n";
//# sourceMappingURL=NegotiableQuoteFragment.d.ts.map