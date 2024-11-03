import { QueryType, ResponseData, OrderProps, OrderItemProps } from '../../types';
import { OrderItemModel, TransformedData } from '../models';

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
export declare const transformOrderData: (orderData: OrderProps, returnRef?: string) => any;
export declare const transformOrderDetails: <T extends "orderData">(queryType: QueryType, response: ResponseData<T>, returnRef: string) => TransformedData<T>;
//# sourceMappingURL=transform-order-details.d.ts.map