/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface CustomerModel {
    permissions: CustomerPermissions;
}
export interface CustomerPermissions {
    canRequestQuote: boolean;
    canEditQuote: boolean;
    canDeleteQuote: boolean;
}
//# sourceMappingURL=customer-model.d.ts.map