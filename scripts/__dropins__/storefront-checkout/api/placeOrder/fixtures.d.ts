import { Order } from '../../data/models/order';

export declare const customerOrder: (overrides?: Partial<Order>) => Order;
export declare const customerOrderItem: (overrides?: Partial<Order['items'][number]>) => Order['items'][number];
export declare const customerOrderItemProduct: (overrides?: Partial<Order['items'][number]['product']>) => Order['items'][number]['product'];
//# sourceMappingURL=fixtures.d.ts.map