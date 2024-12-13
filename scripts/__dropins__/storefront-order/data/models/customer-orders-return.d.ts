import { OrderItemModel } from './order-details';

export interface OrdersReturnItemsPropsModel extends OrderItemModel {
    quantity: number;
    requestQuantity: number;
    status: string;
    uid: string;
}
export interface OrdersReturnTrackingProps {
    status: {
        text: string;
        type: string;
    };
    carrier: {
        uid: string;
        label: string;
    };
    trackingNumber: string;
}
export interface OrdersReturnPropsModel {
    token: string;
    orderNumber: string;
    returnStatus: string;
    returnNumber: string;
    createdReturnAt: string;
    tracking: OrdersReturnTrackingProps[];
    items: OrdersReturnItemsPropsModel[];
}
export interface PageInfoProps {
    pageSize: number;
    totalPages: number;
    currentPage: number;
}
export interface CustomerOrdersReturnModel {
    ordersReturn: OrdersReturnPropsModel[];
    pageInfo?: PageInfoProps;
}
//# sourceMappingURL=customer-orders-return.d.ts.map