import { ShippingMethod } from '../../data/models';
import { UIComponentType } from '../../types/ComponentTypes';
import { TitleProps } from '../../types/TitleProps';
import { Container } from '@dropins/tools/types/elsie/src/lib';
import { HTMLAttributes } from 'preact/compat';

export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    onSelectionChange?: (method: ShippingMethod) => void;
    onSelectionError?: (error: unknown, method: ShippingMethod) => void;
    UIComponentType?: UIComponentType;
    active?: boolean;
    autoSync?: boolean;
}
export declare const ShippingMethods: Container<ShippingMethodsProps>;
//# sourceMappingURL=ShippingMethods.d.ts.map