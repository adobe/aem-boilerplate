import { UpdateProductsFromCart } from '../OutOfStock';
import { PaymentMethodSlotContext } from '../PaymentMethods';
import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export type PreselectedAddressFields = {
    countryCode?: string;
    region?: string;
    postCode?: string;
};
export type PreselectedShippingMethod = {
    carrierCode: string;
    methodCode: string;
};
export type PreselectedCartData = {
    address?: PreselectedAddressFields;
    shippingMethod?: PreselectedShippingMethod;
};
export interface CheckoutProps extends HTMLAttributes<HTMLDivElement> {
    routeHome?: () => string;
    routeCart?: () => string;
    onCheckoutDataUpdate?: () => Promise<void>;
    onCartProductsUpdate?: (items: UpdateProductsFromCart) => void;
    slots?: {
        CartSummaryList?: SlotProps;
        OrderSummary?: SlotProps;
        PaymentMethods?: SlotProps<PaymentMethodSlotContext>;
        ShippingMethods?: SlotProps;
    };
    preselectedCartData?: PreselectedCartData;
    onSignInClick?: () => void;
    onSignOutClick?: () => void;
}
export declare const Checkout: Container<CheckoutProps>;
//# sourceMappingURL=Checkout.d.ts.map