import { OrderDataModel } from '../../data/models';
import { StoreConfigProps, UseOrderCostSummaryProps } from '../../types';

export declare const useOrderCostSummary: ({ orderData, config, }: UseOrderCostSummaryProps) => {
    loading: boolean;
    storeConfig: StoreConfigProps | null;
    order: OrderDataModel | undefined;
};
//# sourceMappingURL=useOrderCostSummary.d.ts.map