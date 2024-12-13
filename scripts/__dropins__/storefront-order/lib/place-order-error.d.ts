import { PlaceOrderResponse } from '../types';

export declare class PlaceOrderError extends Error {
    constructor(message: string);
}
export declare const handlePlaceOrderError: (errors: NonNullable<PlaceOrderResponse['errors']>) => never;
//# sourceMappingURL=place-order-error.d.ts.map