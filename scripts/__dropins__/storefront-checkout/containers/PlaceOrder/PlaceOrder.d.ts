import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
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
    handleValidation?: () => boolean;
    handlePlaceOrder: (ctx: HandlePlaceOrderContext) => Promise<void>;
    slots?: {
        Content?: SlotProps<ContentSlotContext>;
    };
}
export declare const PlaceOrder: {
    ({ hideOnEmptyCart, hideOnVirtualCart, ...props }: import('../../hocs/withConditionalRendering').ConditionalProps & PlaceOrderProps): import("preact/compat").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=PlaceOrder.d.ts.map