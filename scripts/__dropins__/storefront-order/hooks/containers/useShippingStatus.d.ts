import { OrderDataModel } from '../../data/models';
import { UseShippingStatusProps } from '../../types';

export declare const useShippingStatus: ({ orderData }: UseShippingStatusProps) => {
    loading: boolean;
    order: OrderDataModel | undefined;
    isVirtualProduct: boolean;
};
//# sourceMappingURL=useShippingStatus.d.ts.map