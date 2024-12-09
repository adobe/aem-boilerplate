import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel, StoreConfigModel } from '../data/models';

type TaxTypes = {
    taxIncluded: boolean;
    taxExcluded: boolean;
};
export interface StoreConfigProps extends Omit<StoreConfigModel, 'orderCancellationEnabled' | 'orderCancellationReasons' | 'shoppingCartDisplayPrice' | 'shoppingOrdersDisplayShipping' | 'shoppingOrdersDisplaySubtotal'> {
    shoppingCartDisplayPrice: TaxTypes;
    shoppingOrdersDisplayShipping: TaxTypes;
    shoppingOrdersDisplaySubtotal: TaxTypes;
}
export interface OrderCostSummaryProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    withHeader?: boolean;
}
export interface OrderCostSummaryContentProps {
    order?: OrderDataModel;
    withHeader?: boolean;
    loading?: boolean;
    storeConfig: StoreConfigProps | null;
    translations: Record<string, string>;
}
export interface UseOrderCostSummaryProps {
    orderData?: OrderDataModel;
    config: StoreConfigModel | null;
}
export {};
//# sourceMappingURL=orderCostSummary.types.d.ts.map