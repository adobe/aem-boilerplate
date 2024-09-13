import { HTMLAttributes } from 'preact/compat';

export interface PlaceOrderProps extends HTMLAttributes<HTMLDivElement> {
    onClick: () => void;
    handleServerError: (error: any) => void;
}
export declare const PlaceOrder: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & PlaceOrderProps): import("preact/compat").JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=PlaceOrder.d.ts.map