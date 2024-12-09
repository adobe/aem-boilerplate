import { OrderProps } from '..';

export interface PlaceOrderProps extends OrderProps {
}
export interface PlaceOrderResponse {
    data: {
        placeOrder?: {
            errors?: {
                code: string;
                message: string;
            }[];
            orderV2?: PlaceOrderProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=placeOrder.types.d.ts.map