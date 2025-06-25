import { SlotProps } from '@dropins/tools/types/elsie/src/src/lib';
import { ImageProps } from '@dropins/tools/types/elsie/src/components';
import { OrderDataModel, OrderItemModel, OrdersReturnItemsPropsModel, OrdersReturnPropsModel, PageInfoProps } from '../data/models';

export interface IconConfig {
    size: '12' | '16' | '24' | '32' | '64' | '80' | undefined;
    stroke: '4' | '1' | '2' | '3' | undefined;
}
type routeTrackingProps = {
    carrier: string;
    title: string;
    number: string;
};
export interface ReturnsListProps {
    slots?: {
        ReturnItemsDetails?: SlotProps<{
            items: OrdersReturnItemsPropsModel[];
        }>;
        DetailsActionParams?: SlotProps<{
            returnOrderItem: OrdersReturnPropsModel;
        }>;
        ReturnListImage?: SlotProps<{
            data: OrdersReturnItemsPropsModel;
            defaultImageProps: ImageProps;
        }>;
    };
    returnPageSize?: number;
    withReturnsListButton?: boolean;
    returnsInMinifiedView?: number;
    className?: string;
    minifiedView?: boolean;
    withHeader?: boolean;
    routeReturnDetails?: ({ returnNumber, token, orderNumber, }: {
        returnNumber: string;
        token: string;
        orderNumber: string;
    }) => string;
    routeOrderDetails?: ({ token, orderNumber, }: {
        token: string;
        orderNumber: string;
    }) => string;
    routeTracking?: (track: routeTrackingProps) => string;
    routeReturnsList?: () => string;
    routeProductDetails?: (orderItem?: OrderItemModel) => string;
    withThumbnails?: boolean;
}
export interface ReturnsListContentProps extends Omit<ReturnsListProps, 'className' | 'returnPageSize'> {
    placeholderImage?: string;
    minifiedViewKey: 'minifiedView' | 'fullSizeView';
    orderReturns?: OrdersReturnPropsModel[] | [];
    translations: Record<string, string>;
    isMobile: boolean;
    pageInfo: PageInfoProps;
    selectedPage?: number;
    handleSetSelectPage?: (value: number) => void;
    withOrderNumber?: boolean;
    withReturnNumber?: boolean;
    loading: boolean;
}
export interface UseReturnsListProps {
    returnPageSize?: number;
}
export interface OrderReturnsProps {
    slots?: {
        ReturnItemsDetails?: SlotProps<{
            items: OrdersReturnItemsPropsModel[];
        }>;
        DetailsActionParams?: SlotProps<{
            returnOrderItem: OrdersReturnPropsModel;
        }>;
        ReturnListImage?: SlotProps<{
            data: OrdersReturnItemsPropsModel;
            defaultImageProps: ImageProps;
        }>;
    };
    withThumbnails?: boolean;
    withHeader?: boolean;
    className?: string;
    orderData?: OrderDataModel;
    routeReturnDetails?: ({ token, orderNumber, }: {
        token: string;
        orderNumber: string;
    }) => string;
    routeProductDetails?: (product: any) => string;
    routeTracking?: (track: routeTrackingProps) => string;
}
export interface UseOrderReturnsProps {
    orderData?: OrderDataModel;
}
export {};
//# sourceMappingURL=returnsList.types.d.ts.map