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
export declare const REQUEST_RETURN_GUEST_ORDER = "\n  mutation REQUEST_RETURN_GUEST_ORDER($input: RequestGuestReturnInput!) {\n    requestGuestReturn(input: $input) {\n      return {\n        ...REQUEST_RETURN_ORDER_FRAGMENT\n      }\n    }\n  }\n  \n  fragment REQUEST_RETURN_ORDER_FRAGMENT on Return {\n    __typename\n    uid\n    status\n    number\n    created_at\n  }\n\n";
//# sourceMappingURL=requestGuestReturn.graphql.d.ts.map