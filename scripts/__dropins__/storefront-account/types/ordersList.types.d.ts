import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';
import { OrderDetails, OrderItem, ShipmentsTracingModel } from '../data/models';

export interface OrdersListActionContext {
    orderHistoryListItem: OrderDetails;
}
export interface OrdersListCardContext {
    orderHistoryListItem: OrderDetails;
}
export interface OrdersListProps extends HTMLAttributes<HTMLDivElement> {
    minifiedView?: boolean;
    withHeader?: boolean;
    withThumbnails?: boolean;
    slots?: {
        OrdersListAction?: SlotProps<OrdersListActionContext>;
        OrdersListCard?: SlotProps<OrdersListCardContext>;
    };
    routeOrdersList?: () => string;
    routeOrderDetails?: () => string;
    routeReturnDetails?: (params: {
        orderNumber: string;
        orderToken: string;
        returnNumber: string;
    }) => string;
    withFilter?: boolean;
    ordersInMinifiedView?: 1 | 2 | 3;
    pageSize: number;
    routeTracking?: (shipping: ShipmentsTracingModel) => string;
    routeOrderProduct?: (product: OrderItem) => string;
}
export interface OrdersListWrapperProps extends OrdersListProps {
}
export interface OrdersListCardProps extends HTMLAttributes<HTMLDivElement> {
    placeholderImage: string;
    minifiedView: boolean;
    item: OrderDetails;
    withThumbnails: boolean;
    slots?: {
        OrdersListCard?: SlotProps<OrdersListCardContext>;
    };
    routeTracking?: (shipping: ShipmentsTracingModel) => string;
    routeOrderProduct?: (product: OrderItem) => string;
    routeReturnDetails?: (params: {
        orderNumber: string;
        orderToken: string;
        returnNumber: string;
    }) => string;
}
export interface OrdersListActionProps {
    minifiedView: boolean;
    orderNumber?: string;
    orderToken?: string;
    routeOrdersList?: () => string;
    routeOrderDetails?: (orderNumber?: string, orderToken?: string) => string;
}
export interface UseOrdersListProps {
    selectedPage: number;
    minifiedView?: boolean;
    pageSize: number;
    ordersInMinifiedView: number;
    selectedDate: string;
    handleSetFirstOrderDate: (date: string) => void;
}
//# sourceMappingURL=ordersList.types.d.ts.map