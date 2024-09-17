import { HTMLAttributes } from 'preact/compat';

export declare enum CheckoutForms {
    BILLING = "billing_address",
    LOGIN = "login-form",
    SHIPPING = "shipping_address"
}
export interface PlaceOrderProps extends HTMLAttributes<HTMLDivElement> {
    onPlaceOrder?: (ctx: PlaceOrderContext) => Promise<void>;
}
export interface PlaceOrderContext {
    code: string;
}
export declare const PlaceOrder: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & PlaceOrderProps): import("preact/compat").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=PlaceOrder.d.ts.map