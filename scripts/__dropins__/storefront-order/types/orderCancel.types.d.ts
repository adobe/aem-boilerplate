import { ButtonProps, PickerProps } from '../../@adobe-commerce/elsie/src/src/components';
import { PickerOption } from '../../@adobe-commerce/elsie/src/components';

export interface OrderCancelProps {
    orderRef: string;
}
export interface OrderCancelFormProps {
    orderRef: string;
    pickerProps?: PickerProps;
    submitButtonProps?: ButtonProps;
    cancelReasons: PickerOption[];
}
export interface UseOrderActionsProps {
    enableOrderCancellation: boolean | undefined;
}
//# sourceMappingURL=orderCancel.types.d.ts.map