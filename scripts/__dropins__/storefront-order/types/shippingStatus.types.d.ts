import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { OrderDataModel, OrdersReturnPropsModel } from '../data/models';

type routeOrderDetailsTypes = {
    returnNumber?: string;
    token?: string;
    orderNumber?: string;
};
type routeTrackingProps = {
    carrier: string;
    title: string;
    number: string;
};
export interface ShippingStatusProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    collapseThreshold?: number;
    slots?: {
        DeliveryTimeLine?: SlotProps;
        DeliveryTrackActions?: SlotProps;
        ReturnItemsDetails?: SlotProps;
    };
    routeOrderDetails?: ({ returnNumber, token, orderNumber, }: routeOrderDetailsTypes) => string;
    routeTracking?: (track: routeTrackingProps) => string;
    routeProductDetails?: (product: any) => string;
}
export interface UseShippingStatusProps {
    orderData?: OrderDataModel;
}
export interface ShippingStatusCardProps {
    translations: Record<string, string>;
    slots?: {
        DeliveryTimeLine?: SlotProps;
        DeliveryTrackActions?: SlotProps;
        ReturnItemsDetails?: SlotProps;
    };
    orderData?: OrderDataModel;
    collapseThreshold?: number;
    routeOrderDetails?: ({ returnNumber, token, orderNumber, }: routeOrderDetailsTypes) => string;
    routeProductDetails?: (product: any) => string;
    routeTracking?: (track: routeTrackingProps) => string;
}
export interface ShippingStatusReturnCardProps extends ShippingStatusCardProps {
    collapseThreshold: number;
    returnData: OrdersReturnPropsModel;
}
export {};
//# sourceMappingURL=shippingStatus.types.d.ts.map