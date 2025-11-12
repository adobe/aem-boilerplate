import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { PurchaseOrderStatusSlotContext } from '../containers';
import { PURCHASE_ORDER_ACTION } from '../hooks';

export interface PurchaseOrderStatusContentProps {
    t: Record<string, string>;
    loading: boolean;
    availableActions?: PURCHASE_ORDER_ACTION[];
    handleApprove: () => void;
    handleReject: () => void;
    handleCancel: () => void;
    handlePlaceOrder: () => void;
    slots?: {
        PurchaseOrderActions: SlotProps<PurchaseOrderStatusSlotContext>;
    };
}
//# sourceMappingURL=purchaseOrderStatusContent.types.d.ts.map