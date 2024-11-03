import { OrderItemProps } from './getOrderDetails.types';

interface ReturnsProps {
    items: {
        number: number;
        order: {
            number: string;
            token: string;
        };
        shipping: {
            tracking: {
                status: {
                    text: string;
                    type: string;
                };
                carrier: {
                    uid: string;
                    label: string;
                };
                tracking_number: string;
            }[];
        };
        items: {
            quantity: number;
            status: string;
            uid: string;
            request_quantity: number;
            order_item: OrderItemProps;
        }[];
    }[];
}
export interface GetReturnOrdersByNumbersResponse {
    customer: {
        orders: {
            items: [
                {
                    returns: ReturnsProps;
                }
            ];
        };
    };
}
export interface GetReturnOrdersByTokenResponse {
    guestOrderByToken: {
        returns: ReturnsProps;
    };
}
export interface GetOrdersReturnsResponse {
    data: GetReturnOrdersByNumbersResponse | GetReturnOrdersByTokenResponse;
    errors?: {
        message: string;
    }[];
}
export {};
//# sourceMappingURL=getOrdersReturns.types.d.ts.map