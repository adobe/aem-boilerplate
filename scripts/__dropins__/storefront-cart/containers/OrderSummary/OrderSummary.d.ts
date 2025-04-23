import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '../../../@adobe-commerce/elsie/src/lib';
import { CartModel } from '../../data/models';
import { OrderSummaryLineItem } from '../../components';

interface CheckoutRouteContext {
    cartId: string;
}
export interface OrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
    routeCheckout?: (context: CheckoutRouteContext) => string;
    slots?: {
        EstimateShipping?: SlotProps;
        Coupons?: SlotProps;
        GiftCards?: SlotProps;
    };
    enableCoupons?: boolean;
    enableGiftCards?: boolean;
    errors: boolean;
    showTotalSaved?: boolean;
    updateLineItems?: (lineItems: Array<OrderSummaryLineItem>) => Array<OrderSummaryLineItem>;
}
export declare const OrderSummary: Container<OrderSummaryProps, CartModel | null>;
export {};
//# sourceMappingURL=OrderSummary.d.ts.map