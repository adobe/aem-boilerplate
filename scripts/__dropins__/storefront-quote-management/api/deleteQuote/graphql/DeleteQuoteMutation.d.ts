/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const DELETE_QUOTE_MUTATION = "\n  mutation DELETE_QUOTE_MUTATION($quoteUids: [ID!]!) {\n    deleteNegotiableQuotes(\n      input: {\n        quote_uids: $quoteUids\n      }\n    ) {\n      result_status\n      operation_results {\n        __typename\n        ... on NegotiableQuoteUidOperationSuccess {\n          quote_uid\n        }\n        ... on DeleteNegotiableQuoteOperationFailure {\n          quote_uid\n          errors {\n            __typename\n            ... on ErrorInterface {\n              message\n            }\n            ... on NoSuchEntityUidError {\n              uid\n              message\n            }\n            ... on NegotiableQuoteInvalidStateError {\n              message\n            }\n          }\n        }\n      }\n    }\n  }\n";
//# sourceMappingURL=DeleteQuoteMutation.d.ts.map