import { OrderProps } from '..';

export interface PlaceNegotiableQuoteOrderProps extends OrderProps {
}
export interface PlaceNegotiableQuoteOrderResponse {
    data: {
        placeNegotiableQuoteOrder?: {
            errors?: {
                code: string;
                message: string;
            }[];
            orderV2?: PlaceNegotiableQuoteOrderProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=placeNegotiableQuoteOrder.types.d.ts.map