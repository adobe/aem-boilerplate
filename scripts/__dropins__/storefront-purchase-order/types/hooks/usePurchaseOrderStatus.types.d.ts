import { InLineAlertProps } from '@dropins/tools/types/elsie/src/components';

export type PURCHASE_ORDER_STATUS = 'PENDING' | 'APPROVAL_REQUIRED' | 'APPROVED' | 'ORDER_IN_PROGRESS' | 'ORDER_PLACED' | 'ORDER_FAILED' | 'REJECTED' | 'CANCELED' | 'APPROVED_PENDING_PAYMENT';
export type PURCHASE_ORDER_ACTION = 'REJECT' | 'CANCEL' | 'APPROVE' | 'PLACE_ORDER';
export interface UsePurchaseOrderStatusReturn {
    alertType: NonNullable<InLineAlertProps['type']>;
    poId: string | null;
    status: PURCHASE_ORDER_STATUS;
    availableActions: PURCHASE_ORDER_ACTION[] | [];
    loading: boolean;
    isDismissed: boolean;
    alertMessage: string;
    handleOnDismiss: () => void;
    handleApprove: () => Promise<void>;
    handleReject: () => Promise<void>;
    handleCancel: () => Promise<void>;
    handlePlaceOrder: () => Promise<void>;
}
//# sourceMappingURL=usePurchaseOrderStatus.types.d.ts.map