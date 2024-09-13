import { Order as OrderModel } from '../models/order';
import { GuestOrderDataFragment } from '../../__generated__/types';

type Order = GuestOrderDataFragment;
export declare const transformOrder: (order: Order) => OrderModel;
export {};
//# sourceMappingURL=transform-order.d.ts.map