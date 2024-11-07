import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { OrderDataModel, OrdersReturnPropsModel, OrdersReturnTrackingProps } from '../data/models';

type routeTypes = {
    returnNumber?: string;
    token?: string;
    orderNumber?: string;
};
export interface ShippingStatusProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    collapseThreshold?: number;
    slots?: {
        DeliveryTimeLine?: SlotProps;
        DeliveryTrackActions?: SlotProps;
        ReturnItemsDetails?: SlotProps;
    };
    routeOrderDetails?: ({ returnNumber, token, orderNumber, }: routeTypes) => string;
    routeTracking?: (track: OrdersReturnTrackingProps) => string;
    routeProductDetails?: (product: any) => string;
}
export interface UseShippingStatusProps {
    orderData?: OrderDataModel;
}
export interface ShippingStatusCardProps extends ShippingStatusProps {
    translations: Record<string, string>;
}
export interface ShippingStatusReturnCardProps extends ShippingStatusCardProps {
    collapseThreshold: number;
    returnData: OrdersReturnPropsModel;
}
export {};
//# sourceMappingURL=shippingStatus.types.d.ts.map