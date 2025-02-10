import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodRenderCtx {
    cartId: string;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodConfig {
    displayLabel?: boolean;
    enabled?: boolean;
    icon?: string;
    setOnChange?: boolean;
    render?: SlotProps<PaymentMethodRenderCtx>;
}
export interface PaymentMethodsSlot {
    [code: string]: PaymentMethodConfig;
}
/**
 * @deprecated This property is deprecated and will be removed in future versions.
 */
export interface PaymentMethodsHandlerSlot {
    [code: string]: PaymentMethodConfig['render'];
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * @deprecated This property is deprecated and will be removed in future versions.
     */
    setOnChange?: {
        [key: string]: boolean;
    };
    slots?: {
        /**
         * @deprecated This property is deprecated and will be removed in future versions, use Methods instead.
         */
        Handlers?: PaymentMethodsHandlerSlot;
        Methods?: PaymentMethodsSlot;
    };
}
export declare const PaymentMethods: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & PaymentMethodsProps): import("preact/compat").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=PaymentMethods.d.ts.map