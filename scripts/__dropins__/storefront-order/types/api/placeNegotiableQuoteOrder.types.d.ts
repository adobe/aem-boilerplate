import { OrderProps } from '..';

export interface PlaceNegotiableQuoteOrderProps extends OrderProps {
}
export interface PlaceNegotiableQuoteOrderResponse {
    data: {
        placeNegotiableQuoteOrderV2?: {
            errors?: {
                code: string;
                message: string;
            }[];
            order?: PlaceNegotiableQuoteOrderProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=placeNegotiableQuoteOrder.types.d.ts.map