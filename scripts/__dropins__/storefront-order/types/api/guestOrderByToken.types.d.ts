import { OrderProps } from '..';

export interface GuestOrderByTokenProps extends OrderProps {
}
export interface GuestOrderByTokenResponse {
    data: {
        guestOrderByToken?: GuestOrderByTokenProps;
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=guestOrderByToken.types.d.ts.map