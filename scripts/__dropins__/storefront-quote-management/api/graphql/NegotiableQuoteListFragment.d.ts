/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const NEGOTIABLE_QUOTE_LIST_FRAGMENT = "\n  fragment NegotiableQuoteListFragment on NegotiableQuote {\n    uid\n    name\n    created_at\n    updated_at\n    status\n    buyer {\n      firstname\n      lastname\n    }\n    template_name\n    prices {\n      grand_total {\n        value\n        currency\n      }\n    }\n    history {\n      change_type\n      changes {\n        statuses {\n          changes {\n            new_status\n            old_status\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=NegotiableQuoteListFragment.d.ts.map