import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { CartModel } from '../../data/models';

interface CheckoutRouteContext {
    cartId: string;
}
export interface OrderSummaryProps extends HTMLAttributes<HTMLDivElement> {
    routeCheckout?: (context: CheckoutRouteContext) => string;
    slots?: {
        EstimateShipping?: SlotProps;
        Coupons?: SlotProps;
    };
    enableCoupons?: boolean;
    errors: boolean;
}
export declare const OrderSummary: Container<OrderSummaryProps, CartModel | null>;
export {};
//# sourceMappingURL=OrderSummary.d.ts.map