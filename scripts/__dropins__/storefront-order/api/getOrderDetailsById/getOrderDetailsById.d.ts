import { GetOrderDetailsByIdProps } from '../../types';
import { TransformedData } from '../../data/models';

export declare const getOrderDetailsById: <T extends "orderData">({ orderId, returnRef, queryType, returnsPageSize, }: GetOrderDetailsByIdProps) => Promise<TransformedData<T>>;
//# sourceMappingURL=getOrderDetailsById.d.ts.map