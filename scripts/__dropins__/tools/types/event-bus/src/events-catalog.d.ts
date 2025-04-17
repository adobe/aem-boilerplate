/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export interface Events {
    authenticated: boolean;
    locale: string;
    'cart/data': Cart | null;
}
export interface Cart {
    id: string;
    totalQuantity: number;
    items: Array<{
        uid: string;
        quantity: number;
        sku: string;
        name: string;
    }>;
}
//# sourceMappingURL=events-catalog.d.ts.map