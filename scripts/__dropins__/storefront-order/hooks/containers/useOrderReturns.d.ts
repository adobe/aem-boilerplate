import { OrderDataModel, OrdersReturnPropsModel } from '../../data/models';
import { UseOrderReturnsProps } from '../../types';

export declare const useOrderReturns: ({ orderData }: UseOrderReturnsProps) => {
    order: OrderDataModel | undefined;
    orderReturns: [] | OrdersReturnPropsModel[];
};
//# sourceMappingURL=useOrderReturns.d.ts.map