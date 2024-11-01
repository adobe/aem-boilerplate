import { ButtonProps, PickerProps } from '@dropins/tools/types/elsie/src/src/components';
import { PickerOption } from '@dropins/tools/types/elsie/src/components';

export interface OrderCancelProps {
    orderRef: string;
}
export interface OrderCancelReasonFormProps {
    orderRef: string;
    pickerProps?: PickerProps;
    submitButtonProps?: ButtonProps;
    cancelOrder: (orderId: string, reason: string, onSuccess: Function, onError: Function) => Promise<void | null | undefined>;
    cancelReasons: PickerOption[];
}
export interface ConfirmCancelOrderProps {
    enableOrderCancellation: boolean | undefined;
}
//# sourceMappingURL=orderCancel.types.d.ts.map