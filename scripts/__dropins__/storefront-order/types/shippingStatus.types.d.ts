import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '../../@adobe-commerce/elsie/src/lib';
import { OrderDataModel, OrderItemModel, OrdersReturnItemsPropsModel, OrdersReturnPropsModel, ShipmentItemsModel } from '../data/models';
import { ImageProps } from '../../@adobe-commerce/elsie/src/components';

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
        ShippingStatusCardImage?: SlotProps<{
            data: ShipmentItemsModel;
            defaultImageProps: ImageProps;
        }>;
        NotYetShippedProductImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
        ShippingStatusReturnCardImage?: SlotProps<{
            data: OrdersReturnItemsPropsModel;
            defaultImageProps: ImageProps;
        }>;
    };
    routeOrderDetails?: ({ returnNumber, token, orderNumber, }: routeOrderDetailsTypes) => string;
    routeTracking?: (track: routeTrackingProps) => string;
    routeProductDetails?: (product: any) => string;
}
export interface UseShippingStatusProps {
    orderData?: OrderDataModel;
}
export interface ShippingStatusCardProps {
    placeholderImage: string;
    translations: Record<string, string>;
    slots?: {
        DeliveryTimeLine?: SlotProps;
        DeliveryTrackActions?: SlotProps;
        ReturnItemsDetails?: SlotProps;
        ShippingStatusCardImage?: SlotProps<{
            data: ShipmentItemsModel;
            defaultImageProps: ImageProps;
        }>;
        NotYetShippedProductImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
        ShippingStatusReturnCardImage?: SlotProps<{
            data: OrdersReturnItemsPropsModel;
            defaultImageProps: ImageProps;
        }>;
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