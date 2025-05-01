import { ShippingMethod } from '../../data/models';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { UIComponentType } from '../../types/ComponentTypes';

export interface ShippingMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    onSelectionChange?: (method: ShippingMethod) => void;
    isLoading?: boolean;
    options: ShippingMethod[];
    selection?: ShippingMethod;
    title?: VNode;
    UIComponentType?: UIComponentType;
}
export declare const ShippingMethods: FunctionComponent<ShippingMethodsProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
//# sourceMappingURL=ShippingMethods.d.ts.map