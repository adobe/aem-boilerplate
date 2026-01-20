import { AdditionalData, PaymentMethod } from '../../data/models/payment-method';
import { TitleProps, UIComponentType } from '../../types';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

interface RenderContext {
    additionalData?: AdditionalData;
    cartId: string;
    replaceHTML: (domElement: HTMLElement) => void;
    setAdditionalData: (data: AdditionalData) => void;
}
export interface PaymentMethodConfig {
    autoSync?: boolean;
    displayLabel?: boolean;
    enabled?: boolean;
    icon?: string;
    render?: SlotProps<RenderContext>;
}
export interface PaymentMethodHandlers {
    [code: string]: PaymentMethodConfig;
}
interface CartSyncError {
    method: PaymentMethod;
    error: Error;
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    slots?: {
        Methods?: PaymentMethodHandlers;
    } & TitleProps['slots'];
    UIComponentType?: UIComponentType;
    active?: boolean;
    autoSync?: boolean;
    onCartSyncError?: (error: CartSyncError) => void;
    onSelectionChange?: (method: PaymentMethod) => void;
}
export declare const PaymentMethods: Container<PaymentMethodsProps>;
export {};
//# sourceMappingURL=PaymentMethods.d.ts.map