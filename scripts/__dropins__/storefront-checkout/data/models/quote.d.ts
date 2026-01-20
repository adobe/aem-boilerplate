import { Address, PaymentMethod, ShippingAddress } from '.';
import { NegotiableQuoteStatus } from '../../__generated__/types';

export interface NegotiableQuote {
    type: 'quote';
    availablePaymentMethods?: PaymentMethod[];
    billingAddress?: Address;
    email?: string;
    isEmpty: boolean;
    isVirtual: boolean;
    name: string;
    selectedPaymentMethod?: PaymentMethod;
    shippingAddresses: ShippingAddress[];
    status: NegotiableQuoteStatus;
    uid: string;
}
//# sourceMappingURL=quote.d.ts.map