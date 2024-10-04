import { OrderProps } from '..';

export interface GuestOrderProps extends OrderProps {
}
export interface GuestOrderResponse {
    data: {
        guestOrder?: GuestOrderProps;
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getGuestOrder.types.d.ts.map