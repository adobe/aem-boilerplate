import { Container, SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface ContentSlotContext {
    code: string;
}
export interface HandlePlaceOrderContext {
    code: string;
    cartId: string;
}
export interface PlaceOrderProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    active?: boolean;
    handleValidation?: () => boolean;
    handlePlaceOrder: (ctx: HandlePlaceOrderContext) => Promise<void>;
    slots?: {
        Content?: SlotProps<ContentSlotContext>;
    };
}
export declare const PlaceOrder: Container<PlaceOrderProps>;
//# sourceMappingURL=PlaceOrder.d.ts.map