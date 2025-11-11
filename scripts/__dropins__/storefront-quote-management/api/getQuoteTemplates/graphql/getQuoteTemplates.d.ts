/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const QUOTE_TEMPLATES_QUERY = "\n  query QUOTE_TEMPLATES_QUERY(\n    $filter: NegotiableQuoteTemplateFilterInput\n    $pageSize: Int\n    $currentPage: Int\n    $sort: NegotiableQuoteTemplateSortInput\n  ) {\n    negotiableQuoteTemplates(\n      filter: $filter\n      pageSize: $pageSize\n      currentPage: $currentPage\n      sort: $sort\n    ) {\n      items {\n        # uid\n        template_id\n        name\n        # created_at\n        # updated_at\n        # last_ordered_at\n        status\n        state\n        min_negotiated_grand_total\n        last_shared_at\n        # expiration_date\n        orders_placed\n        # grand_total {\n        #   currency\n        #   value\n        # }\n      }\n      page_info {\n        current_page\n        page_size\n        total_pages\n      }\n      total_count\n      sort_fields {\n        default\n        options {\n          label\n          value\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=getQuoteTemplates.d.ts.map