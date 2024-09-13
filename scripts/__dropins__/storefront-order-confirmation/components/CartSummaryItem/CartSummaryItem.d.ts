import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { OrderItem as OrderItemModel } from '../../data/models/order';

export interface CartSummaryItemProps extends HTMLAttributes<HTMLDivElement> {
    item: OrderItemModel;
    taxIncluded?: boolean;
}
export declare const CartSummaryItem: FunctionComponent<CartSummaryItemProps>;
//# sourceMappingURL=CartSummaryItem.d.ts.map