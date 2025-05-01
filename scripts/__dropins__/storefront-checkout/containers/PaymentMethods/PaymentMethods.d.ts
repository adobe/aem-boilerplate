import { UIComponentType } from '../../types/ComponentTypes';
import { TitleProps } from '../../types/TitleProps';
import { Container, SlotProps } from '../../../@adobe-commerce/elsie/src/lib';
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
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
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
    } & TitleProps['slots'];
    UIComponentType?: UIComponentType;
}
export declare const PaymentMethods: Container<PaymentMethodsProps>;
//# sourceMappingURL=PaymentMethods.d.ts.map