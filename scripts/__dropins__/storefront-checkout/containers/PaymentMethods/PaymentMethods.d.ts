import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodSlotContext {
    addPaymentMethodHandler: (code: string, handler: {
        render: SlotProps<PaymentMethodContentSlotContext>;
    }) => void;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodContentSlotContext {
    cartId: string;
    onPlaceOrder: (fn: () => Promise<void>) => void;
    handleServerError: (error: any) => void;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    paymentMethodsSlot?: SlotProps<PaymentMethodSlotContext>;
    onPlaceOrder: (fn?: () => Promise<void>) => void;
    handleServerError: (error: any) => void;
}
export declare const PaymentMethods: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & PaymentMethodsProps): import("preact/compat").JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=PaymentMethods.d.ts.map