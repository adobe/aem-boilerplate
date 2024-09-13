import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export type CheckoutBlocks = {
    billingAddress: VNode;
    billToShippingAddress: VNode;
    cartSummaryList?: VNode;
    emptyCart: VNode;
    login: VNode;
    orderSummary?: VNode;
    outOfStock: VNode;
    paymentMethods: VNode;
    placeOrder: VNode;
    shippingAddress: VNode;
    shippingMethods?: VNode;
};
declare const Main: FunctionComponent<{
    blocks: CheckoutBlocks;
}>;
export interface CheckoutProps extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
}
interface CheckoutComponent extends FunctionComponent<CheckoutProps> {
    Main: typeof Main;
}
export declare const Checkout: CheckoutComponent;
export {};
//# sourceMappingURL=Checkout.d.ts.map