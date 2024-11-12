import { OrderItemModel } from '../models/order';
import { PlaceOrderMutation } from '../../__generated__/types';

type OrderProps = NonNullable<NonNullable<PlaceOrderMutation['placeOrder']>['orderV2']>;
type OrderItems = OrderProps['items'];
type OrderItemProps = NonNullable<OrderItems>[number];
export declare const transformConfigurableOptions: (item: OrderItemProps) => Record<string, string> | undefined;
export declare const transformBundleOptions: (data: any) => {
    [key: string]: any;
} | null;
export declare const transformLinks: (links: {
    title: string;
}[]) => {
    count: number;
    result: string;
} | null;
export declare const transformOrderItems: (items: OrderItemProps[]) => OrderItemModel[];
export declare const transformOrder: (orderData: OrderProps) => any;
export {};
//# sourceMappingURL=transform-order.d.ts.map