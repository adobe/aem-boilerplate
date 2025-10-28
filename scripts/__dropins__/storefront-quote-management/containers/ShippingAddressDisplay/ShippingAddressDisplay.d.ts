import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';

export interface ShippingAddressDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    quoteData?: NegotiableQuoteModel;
    loading?: boolean;
}
export declare const ShippingAddressDisplay: Container<ShippingAddressDisplayProps>;
//# sourceMappingURL=ShippingAddressDisplay.d.ts.map