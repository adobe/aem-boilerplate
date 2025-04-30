import { Container, SlotProps } from '../../../@adobe-commerce/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface ContentSlotContext {
    code: string;
}
export interface HandlePlaceOrderContext {
    code: string;
    cartId: string;
    isSubscribedToNewsletter?: boolean;
    email?: string;
}
export interface PlaceOrderProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    handleValidation?: () => boolean;
    handlePlaceOrder: (ctx: HandlePlaceOrderContext) => Promise<void>;
    slots?: {
        Content?: SlotProps<ContentSlotContext>;
    };
}
export declare const PlaceOrder: Container<PlaceOrderProps>;
//# sourceMappingURL=PlaceOrder.d.ts.map