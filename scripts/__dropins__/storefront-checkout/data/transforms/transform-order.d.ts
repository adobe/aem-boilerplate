import { Order as OrderModel } from '../models/order';
import { PlaceOrderMutation } from '../../__generated__/types';

type Order = NonNullable<NonNullable<PlaceOrderMutation['placeOrder']>['orderV2']>;
export declare const transformOrder: (order: Order) => OrderModel;
export {};
//# sourceMappingURL=transform-order.d.ts.map