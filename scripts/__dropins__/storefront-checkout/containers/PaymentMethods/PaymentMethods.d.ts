import { UIComponentType } from '../../types/ComponentTypes';
import { TitleProps } from '../../types/TitleProps';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface PaymentMethodRenderCtx {
    cartId: string;
    replaceHTML: (domElement: HTMLElement) => void;
}
export interface PaymentMethodConfig {
    displayLabel?: boolean;
    enabled?: boolean;
    icon?: string;
    autoSync?: boolean;
    render?: SlotProps<PaymentMethodRenderCtx>;
}
export interface PaymentMethodsSlot {
    [code: string]: PaymentMethodConfig;
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    slots?: {
        Methods?: PaymentMethodsSlot;
    } & TitleProps['slots'];
    UIComponentType?: UIComponentType;
    active?: boolean;
    autoSync?: boolean;
}
export declare const PaymentMethods: Container<PaymentMethodsProps>;
//# sourceMappingURL=PaymentMethods.d.ts.map