import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { OrderDataModel, OrderItemModel } from '../data/models';

type options = Record<string, string | number | boolean>;
export type TaxTypes = {
    taxIncluded: boolean;
    taxExcluded: boolean;
};
export interface OrderProductListProps {
    slots?: {
        Footer: SlotProps;
    };
    orderData?: OrderDataModel;
    className?: string;
    withHeader?: boolean;
    showConfigurableOptions?: (options: options | {}) => options;
    routeProductDetails?: (product: any) => string;
}
export interface OrderProductListContentProps extends Omit<OrderProductListProps, 'className'> {
    placeholderImage: string;
    order?: OrderDataModel;
    taxConfig: TaxTypes;
    loading: boolean;
}
export interface CartSummaryItemProps {
    slots?: {
        Footer: SlotProps;
    };
    placeholderImage?: string;
    disabledIncrementer?: boolean;
    loading: boolean;
    itemType: string;
    translations: Record<string, string>;
    product: OrderItemModel;
    taxConfig: TaxTypes;
    onQuantity?: (value: number) => void;
    showConfigurableOptions?: (options: options | {}) => options;
    routeProductDetails?: (product: any) => string;
}
export interface UseOrderProductListProps extends Omit<OrderProductListProps, 'className' | 'withHeader' | 'showConfigurableOptions' | 'slots'> {
}
export {};
//# sourceMappingURL=orderProductList.types.d.ts.map