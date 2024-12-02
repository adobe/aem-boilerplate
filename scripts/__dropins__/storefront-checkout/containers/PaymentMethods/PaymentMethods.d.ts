import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodsMainSlotContext {
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodHandlerSlots {
    [code: string]: SlotProps<PaymentMethodHandlerSlotContext>;
}
export interface PaymentMethodHandlerSlotContext {
    cartId: string;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    setOnChange?: {
        [key: string]: boolean;
    } | undefined;
    slots?: {
        Main?: SlotProps<PaymentMethodsMainSlotContext>;
        Handlers?: PaymentMethodHandlerSlots;
    };
}
export declare const PaymentMethods: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & PaymentMethodsProps): import("preact/compat").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=PaymentMethods.d.ts.map