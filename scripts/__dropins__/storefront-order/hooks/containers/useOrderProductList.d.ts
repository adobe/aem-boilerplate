import { OrderDataModel } from '../../data/models';
import { TaxTypes, UseOrderProductListProps } from '../../types';

export declare const useOrderProductList: ({ orderData, }: UseOrderProductListProps) => {
    loading: boolean;
    taxConfig: TaxTypes;
    order: OrderDataModel | undefined;
};
//# sourceMappingURL=useOrderProductList.d.ts.map