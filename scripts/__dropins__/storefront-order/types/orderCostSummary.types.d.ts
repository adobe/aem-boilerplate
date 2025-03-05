import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel, StoreConfigModel } from '../data/models';

type TaxTypes = {
    taxIncluded: boolean;
    taxExcluded: boolean;
};
export interface StoreConfigProps extends Omit<StoreConfigModel, 'orderCancellationEnabled' | 'orderCancellationReasons' | 'shoppingOrderDisplayPrice' | 'shoppingOrdersDisplayShipping' | 'shoppingOrdersDisplaySubtotal'> {
    shoppingOrderDisplayPrice: TaxTypes;
    shoppingOrdersDisplayShipping: TaxTypes;
    shoppingOrdersDisplaySubtotal: TaxTypes;
    salesPrintedCard: TaxTypes;
    salesGiftWrapping: TaxTypes;
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