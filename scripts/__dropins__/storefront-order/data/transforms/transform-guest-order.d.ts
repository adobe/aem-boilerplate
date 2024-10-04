import { GuestOrderByTokenResponse, GuestOrderResponse } from '../../types';
import { OrderDataModel } from '../models';

export declare const transformGuestOrder: (response: GuestOrderResponse) => OrderDataModel | null;
export declare const transformGuestOrderByToken: (response: GuestOrderByTokenResponse) => OrderDataModel | null;
//# sourceMappingURL=transform-guest-order.d.ts.map