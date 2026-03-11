import { ShippingMethod } from '../../data/models';
import { UIComponentType } from '../../types';
import { SlotProps } from '@dropins/tools/types/elsie/src/lib';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ShippingMethodItemContext } from '../../containers/ShippingMethods';

/** Slot function type for ShippingMethodItem - uses Elsie Slot context for full replacement */
export type ShippingMethodItemSlot = SlotProps<ShippingMethodItemContext>;
export interface ShippingMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    UIComponentType?: UIComponentType;
    busy?: boolean;
    error?: string | null;
    onDismissError?: () => void;
    onSelectionChange?: (method: ShippingMethod) => void;
    options: ShippingMethod[];
    selection: ShippingMethod | null;
    shippingMethodItemSlot?: ShippingMethodItemSlot;
    title?: VNode;
}
export declare const ShippingMethods: FunctionComponent<ShippingMethodsProps & import('../ConditionalWrapper/ConditionalWrapper').ConditionalProps>;
//# sourceMappingURL=ShippingMethods.d.ts.map