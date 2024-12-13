import { ReturnsItemsProps } from './getOrderDetails.types';

export interface OrdersReturnResponseProps {
    page_info?: {
        page_size: number;
        total_pages: number;
        current_page: number;
    };
    items?: ReturnsItemsProps[];
}
export interface GetCustomerOrdersReturnResponse {
    data: {
        customer: {
            returns: OrdersReturnResponseProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
//# sourceMappingURL=getCustomerOrdersReturn.types.d.ts.map