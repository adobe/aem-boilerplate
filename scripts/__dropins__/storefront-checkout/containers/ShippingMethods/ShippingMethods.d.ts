import { ShippingMethod } from '../../data/models';
import { UIComponentType } from '../../types/ComponentTypes';
import { TitleProps } from '../../types/TitleProps';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

interface CartSyncError {
    method: ShippingMethod;
    error: Error;
}
export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    UIComponentType?: UIComponentType;
    active?: boolean;
    autoSync?: boolean;
    onCartSyncError?: (error: CartSyncError) => void;
    onSelectionChange?: (method: ShippingMethod) => void;
}
export declare function emitShippingEstimateEvent(selection: ShippingMethod): void;
export declare const ShippingMethods: Container<ShippingMethodsProps>;
export {};
//# sourceMappingURL=ShippingMethods.d.ts.map