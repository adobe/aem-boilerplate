import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel, OrdersReturnPropsModel } from '../data/models';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';

export declare enum StatusEnumProps {
    PENDING = "pending",
    SHIPPING = "shipping",
    COMPLETE = "complete",
    PROCESSING = "processing",
    HOLD = "on hold",
    CANCELED = "Canceled",
    SUSPECTED_FRAUD = "suspected fraud",
    PAYMENT_REVIEW = "payment review"
}
type DefaultSlotContext = {
    orderData?: OrderDataModel;
};
export interface OrderStatusProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    statusTitle?: string;
    status?: StatusEnumProps;
    slots?: {
        OrderActions: SlotProps<DefaultSlotContext>;
    };
    routeCreateReturn?: (orderReturn: OrdersReturnPropsModel) => string;
}
export interface OrderStatusContentProps extends Omit<OrderStatusProps, 'statusTitle' | 'orderData' | 'status'> {
    title?: string;
    status?: StatusEnumProps;
    orderData?: OrderDataModel;
}
export interface OrderActionsProps {
    className?: string;
    orderData?: OrderDataModel;
    slots?: {
        OrderActions: SlotProps<DefaultSlotContext>;
    };
    routeCreateReturn?: (orderReturn: OrdersReturnPropsModel) => string;
}
export interface UseOrderStatusProps {
    orderData?: OrderDataModel;
}
export {};
//# sourceMappingURL=orderStatus.types.d.ts.map