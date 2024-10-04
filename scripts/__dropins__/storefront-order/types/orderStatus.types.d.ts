import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel } from '../data/models';
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
}
export interface OrderStatusContentProps extends Omit<OrderStatusProps, 'statusTitle' | 'orderData' | 'status'> {
    title?: string;
    status?: StatusEnumProps;
    orderData?: OrderDataModel;
}
export interface OrderActionsProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    slots?: {
        OrderActions: SlotProps<DefaultSlotContext>;
    };
}
export interface UseOrderStatusProps {
    orderData?: OrderDataModel;
}
export {};
//# sourceMappingURL=orderStatus.types.d.ts.map