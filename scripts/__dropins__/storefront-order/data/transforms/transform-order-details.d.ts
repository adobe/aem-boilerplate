import { QueryType, ResponseData, OrderProps, OrderItemProps } from '../../types';
import { TransformedData } from '../models';

export declare const transformConfigurableOptions: (item: OrderItemProps) => Record<string, string> | undefined;
export declare const transformOrderData: (orderData: OrderProps) => any;
export declare const transformOrderDetails: <T extends "orderData">(queryType: QueryType, response: ResponseData<T>) => TransformedData<T>;
//# sourceMappingURL=transform-order-details.d.ts.map