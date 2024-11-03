import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { OrderDataModel } from '../data/models';

export interface ShippingStatusProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    collapseThreshold?: number;
    slots?: {
        DeliveryTimeLine?: SlotProps;
        DeliveryTrackActions?: SlotProps;
    };
}
export interface UseShippingStatusProps {
    orderData?: OrderDataModel;
}
export interface ShippingStatusCardProps extends ShippingStatusProps {
}
//# sourceMappingURL=shippingStatus.types.d.ts.map