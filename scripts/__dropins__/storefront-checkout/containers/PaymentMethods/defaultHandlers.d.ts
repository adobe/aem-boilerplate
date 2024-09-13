import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { PaymentMethodContentSlotContext } from '.';

export interface PaymentMethodHandler {
    render: SlotProps<PaymentMethodContentSlotContext>;
}
export interface PaymentMethodHandlers {
    [code: string]: PaymentMethodHandler;
}
export declare const defaultHandlers: PaymentMethodHandlers;
//# sourceMappingURL=defaultHandlers.d.ts.map