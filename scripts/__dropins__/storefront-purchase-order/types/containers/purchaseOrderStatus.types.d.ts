import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { PURCHASE_ORDER_ACTION } from '../hooks';

export type PurchaseOrderStatusSlotContext = {
    loading: boolean;
    availableActions?: PURCHASE_ORDER_ACTION[];
    handleApprove: () => void;
    handleReject: () => void;
    handleCancel: () => void;
    handlePlaceOrder: () => void;
};
export interface PurchaseOrderStatusProps {
    className?: string;
    withHeader?: boolean;
    withWrapper?: boolean;
    slots?: {
        PurchaseOrderActions: SlotProps<PurchaseOrderStatusSlotContext>;
    };
}
//# sourceMappingURL=purchaseOrderStatus.types.d.ts.map