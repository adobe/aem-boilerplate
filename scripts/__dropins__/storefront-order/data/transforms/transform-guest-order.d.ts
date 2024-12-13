import { GuestOrderByTokenResponse, GuestOrderResponse } from '../../types';
import { OrderDataModel } from '../models';

export declare const transformGuestOrder: (response: GuestOrderResponse, returnRef?: string) => OrderDataModel | null;
export declare const transformGuestOrderByToken: (response: GuestOrderByTokenResponse, returnRef?: string) => OrderDataModel | null;
//# sourceMappingURL=transform-guest-order.d.ts.map