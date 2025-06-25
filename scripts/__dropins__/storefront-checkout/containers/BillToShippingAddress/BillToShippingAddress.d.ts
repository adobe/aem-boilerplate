import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

interface CartSyncError {
    error: Error;
}
export interface BillToShippingAddressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    active?: boolean;
    autoSync?: boolean;
    onCartSyncError?: (error: CartSyncError) => void;
    onChange?: (checked: boolean) => void;
}
export declare const BillToShippingAddress: Container<BillToShippingAddressProps>;
export {};
//# sourceMappingURL=BillToShippingAddress.d.ts.map