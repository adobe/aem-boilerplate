import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ShippingAddress } from '../../data/models/negotiable-quote-model';

export interface ShippingAddressDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    shippingAddress?: ShippingAddress;
    loading?: boolean;
    noAddressMessage?: string;
}
export declare const ShippingAddressDisplay: FunctionComponent<ShippingAddressDisplayProps>;
export declare const ShippingAddressDisplaySkeleton: FunctionComponent;
//# sourceMappingURL=ShippingAddressDisplay.d.ts.map