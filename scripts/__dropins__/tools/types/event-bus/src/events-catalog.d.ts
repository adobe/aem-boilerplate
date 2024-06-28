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