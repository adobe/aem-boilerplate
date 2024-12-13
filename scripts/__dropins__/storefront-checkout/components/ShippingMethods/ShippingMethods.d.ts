import { ShippingMethod } from '../../data/models';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean;
    onSelectionChange?: (method: ShippingMethod) => void;
    options?: ShippingMethod[];
    selection?: ShippingMethod;
}
export declare const ShippingMethods: FunctionComponent<ShippingMethodsProps>;
//# sourceMappingURL=ShippingMethods.d.ts.map