import { PreselectedShippingMethod } from '../Checkout';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement> {
    onCheckoutDataUpdate?: () => Promise<void>;
    preSelectedMethod?: PreselectedShippingMethod;
    shippingMethodsSlot?: SlotProps;
}
export declare const ShippingMethods: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & ShippingMethodsProps): import("preact/compat").JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=ShippingMethods.d.ts.map