import { CartModel, InitializeInput, NegotiableQuoteModel, SynchronizeInput } from '.';

export declare const isCartInput: (input: NonNullable<InitializeInput | SynchronizeInput>) => input is CartModel;
export declare const isNegotiableQuoteInput: (input: NonNullable<InitializeInput | SynchronizeInput>) => input is NegotiableQuoteModel;
//# sourceMappingURL=guards.d.ts.map